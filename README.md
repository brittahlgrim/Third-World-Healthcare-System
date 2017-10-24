# Third-World-Healthcare-System
Dynamic content medical records web application designed to help El Salvadoran health promoters with appointment scheduling.

-----

![](https://raw.githubusercontent.com/brittahlgrim/Third-World-Healthcare-System/master/pics/1.gif)

-----

![](https://raw.githubusercontent.com/brittahlgrim/Third-World-Healthcare-System/master/pics/2.gif)

-----

## Background
This is a Senior Design project with the ultimate goal of finding a solution to improve the healthcare systems in underdeveloped countries. 5 Marquette University students worked on this project: Brittany Ahlgrim, Sydney Barovsky, Ben Durette, J.P. Rivera, David Vitale.

## Technical Details
This web application has a Node.js/Express backend with an Angular.js frontend. A MySQL database is used for all data storage/retention. This whole system is "bare-bones" enough run on one low-spec computer, preferably in a Unix-like environment.

# Project Structure Breakdown

* config
    * All configuration specific bits of information needed to connect to the right database or use the correct passport information.
* doc
    * This senior design project had many deliverable documentation writeups of the progress this project made outside of the code: this folder contains the final deliverable and final powerpoint presentation delivered by the team members.
* db
    * Different MySQL database dumps, effectively version controlling different database schemas for development purposes.
* web
    * node
        * The entry point of the Node.js back-end server
    * routes
        * Functions used by all endpoints
    * static
        * All of the front-end files, including the .html views and the .js controller/service scripts.
* README.md
    * This file
* build.sh
    * The bash script that will make sure all correct software is installed, set up the correct version database schema, start the backend node.js server, etc. Use like './build.sh -p {MySQL_password}
* package.json
    * What node_module packages to include
* startForever.sh / stopForever.sh
    * Two bash scripts that will automatically restart the instance on failure, keep logs, etc. Use this for deploying instances.
