# Unimelb Design System

## Copyright Notice
Copyright 2015 The University of Melbourne

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

## Development environment

This app now runs on webpack, so ruby is required to run the documentation/demo site, and node is required to build the system.

    git clone git@github.com:marcom-unimelb/unimelb-design-system.git
    cd unimelb-design-system
    cp .env.example .env
    bundle install
    npm install
    foreman start -f Procfile.dev

The development site will be available at [http://localhost:5000/](http://localhost:5000/)

## Deploying to production

A precompiled package of all target builds can be created by running

    rake assets:build

The compiled output can be found under /deploy
