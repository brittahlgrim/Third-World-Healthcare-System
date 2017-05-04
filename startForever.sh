#!/bin/bash

sudo ./node_modules/forever/bin/forever \
	start \
	-al forever.log \
	-ao out.log \
	-ae err.log \
	./web/node/server.js
