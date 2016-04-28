# Unimelb Design System

## Copyright Notice
Copyright 2016 The University of Melbourne

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

## Three run modes!

To make a copy and run the system locally, you will need to

    git clone git@github.com:marcom-unimelb/unimelb-design-system.git
    cd unimelb-design-system
    cp .env.example .env
    bundle install
    npm install

### "Hot"

This is the development mode, where a webpack dev server with *hot module replacement* runs in parallel to the app server. Working on bug fixes and new features is done with this mode. Start this server with

    foreman start -f Procfile.hot

Three servers will run in parallel (node.js, webpack and rack) and the entry point is available through a proxy at [http://localhost:7001/](http://localhost:7001/)

### "Cold"

This mode is similar to development, it uses the same app server, but insteads uses the deployed CDN-hosted system assets rather than a local asset server. This mode is used for exporting a versioned static site to use in production.

    foreman start -f Procfile.cold

Only the app server is running in this mode, your entry point is [http://localhost:7000/](http://localhost:7000/)

### Production

This is what runs on [https://web.unimelb.edu.au](https://web.unimelb.edu.au) - the statically exported cold mode from above, saved by version to this repo under `/cold`. We were going to use this host multiple versions of the documentation (one for each deployed release of the system), but ran into a problem with maximum  heroku slug size and have only hosted v1.0 and the current version since then.

    foreman start

A basic rack server is running in this mode, as it does in prod on heroku. The entry point is [http://localhost:7000/](http://localhost:7000/)

Ideally the site will be migrated directly to S3 in the near future!

## Deploying asset package

A precompiled package of all target builds can be created by running

    rake assets:build

The compiled output can be found under /build
