#!/bin/bash

#-----
#CHECK CMDLINE ARGS
#-----

output=/dev/stdout
if [ "$1" = "-q" ]
then
	output=/dev/null
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

#Install every npm package in the file
file="./web/node/required-npm-packages.txt"
while IFS= read -r line
do
	echo "Checking if $line npm package is installed..." > $output
	npm_output="$(npm install $line)"
	if [ $? -ne 0 -a $? -ne 1 ]
	then
		echo "Error: couldn't install $line npm package..."
		exit 127
	else
		echo "$npm_output" > $output
	fi

done<"$file"
