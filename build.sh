#!/bin/bash

#-----
#CHECK CMDLINE ARGS
#-----

output=/dev/stdout
skip_npm_update=false
db_root_password="passwords cant have spaces"
while getopts "p::s" opt; do
  case $opt in
  p)
      db_root_password=$OPTARG
      ;;
  s)
      skip_npm_update=true
      ;;
  esac
done

echo "skip=$skip_npm_update"

if [ "$db_root_password" = "passwords cant have spaces" ]
then
	echo "ERROR: Enter password with -p flag"
	echo "    (ex. ./build.sh -p foobar)"	
	exit 127
fi

#-----
#CHECK ALL SOFTWARE IS INSTALLED
#-----

#check if npm is installed
echo "Checking if npm is installed..." > $output
tmp="$(npm --help)"
if [ $? -ne 0 -a $? -ne 1 ]
then
	echo "Error: couldn't find npm on the system. Do you have npm installed?"
	exit 127
fi

#check if node is installed, get what command to use (normally either node or nodejs
echo "Checking if node is installed..." > $output
open_node_command=""
tmp="$(node --help)"
if [ $? -ne 0 ]
then
	tmp="$(nodejs --help)"
	if [ $? -ne 0 ]
	then
		echo "Error: couldn't find node or nodejs commands on machine. Do you have node installed?"
		exit 127
	else
		open_node_command="nodejs"
	fi
else
	open_node_command="node"
fi

echo "Using $open_node_command for opening node..." > $output

#check if mysql is installed
echo "Checking if mysql is installed..." > $output
tmp="$(mysql --help)"
if [ $? -ne 0 -a $? -ne 1 ]
then
	echo "Error: couldn't find mysql on the system. Do you have it installed?"
	exit 127
fi

#do an npm update for all specified files
if [ "$skip_npm_update" = false ]
then
	./web/node/do-npm-update.sh
fi

#-----
#SET UP MYSQL DB AND NODE SERVER
#-----

echo "Attempting to connect to db..." > $output

#delete any previous database, remake it
mysql --user=root --password=topeno -e "drop database twhs_test_db"
mysql --user=root --password=topeno -e "create database twhs_test_db"
mysql --user=root --password=topeno twhs_test_db < ./db/records_db_table_structure.sql

echo "Attempting to start node server..." > $output
$open_node_command ./web/node/server.js &
nodeserver_pid=$!
sleep 5

echo "Attempting to open web page... (Note: this might not work)" > $output

#-----
#DEPLOY BROWSER PAGE AND WAIT FOR USER TO CLOSE US
#-----
tmp="$(open http://localhost:8080)"
if [ $? -ne 0 ]
then
	echo "***ERROR*** Open command didn't work. Attempting firefox, but you should be able to open any browser http://localhost:8080"
	firefox http://localhost:8080
fi

echo -e "\t\t-----\n\t\t*****\n\t\t-----\nEverything set up successfully! Press enter to quit...\n\t\t-----\n\t\t*****\n\t\t-----"
read tmp

echo "Quiting... removing the Db instance..." > $output
mysql --user=root --password=$db_root_password -e "drop database twhs_test_db"

echo "removing node server..." > $output
kill $nodeserver_pid

echo "Done!"
