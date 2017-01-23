# Unimelb Design System

## Copyright Notice
Copyright 2016 The University of Melbourne

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

To make a copy and run the system locally, you will need to:

    git clone git@github.com:marcom-unimelb/unimelb-design-system.git
    cd unimelb-design-system
    cp .env.example .env
    bundle install
    npm install

### Running locally

This is the development mode, where a webpack dev server with *hot module replacement* runs in parallel to the app server. This mode is for working on bug fixes and new features. Start the servers with:

    foreman start -f Procfile.hot

Alternatively, you may run:

    npm start

Two servers run in parallel (rack and webpack) and the entry point is available through a proxy at [http://localhost:7001/](http://localhost:7001/).

## Building the assets

A precompiled, production package of every target builds can be created by running:

    rake assets:build

This is equivalent to running:

    npm run clean && npm run build

The compiled output can be found in the `/build` directory.

### Shrinkwrap

To update `npm-shrinkwrap.json` after adding, removing or updating dependencies, run `npm run shrink`.
