#!/bin/bash

#Install every npm package in the file
file="./web/node/required-npm-packages.txt"
while IFS= read -r line
do
	echo "Checking if $line npm package is installed..."
	npm_output="$(npm install $line)"
	if [ $? -ne 0 -a $? -ne 1 ]
	then
		echo "Error: couldn't install $line npm package..."
		exit 127
	else
		echo "$npm_output"
	fi

done<"$file"
