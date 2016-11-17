# Unimelb Design System

## Copyright Notice
Copyright 2016 The University of Melbourne

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

## Three run modes!

To make a copy and run the system locally, you will need to:

    git clone git@github.com:marcom-unimelb/unimelb-design-system.git
    cd unimelb-design-system
    cp .env.example .env
    bundle install
    npm install

### "Hot"

This is the development mode, where a webpack dev server with *hot module replacement* runs in parallel to the app server. This mode is for working on bug fixes and new features. Start the servers with:

    foreman start -f Procfile.hot

Alternatively, you may run:

    npm start

Two servers run in parallel (rack and webpack) and the entry point is available through a proxy at [http://localhost:7001/](http://localhost:7001/).

### "Cold"

This mode uses the same app server as the *hot* mode, but uses the deployed CDN-hosted system assets rather than a local asset server. This mode is for exporting a versioned static site to use in production.

    foreman start -f Procfile.cold

Only the app server runs in this mode, and the entry point is [http://localhost:7000/](http://localhost:7000/).

### Production

This is what runs on [https://web.unimelb.edu.au](https://web.unimelb.edu.au) - the statically exported cold mode from above, saved by version to this repo in the `/cold` directory. We were going to use this to host multiple versions of the documentation (one for each deployed release of the system), but ran into a problem with maximum heroku slug size and have only hosted v1.0 and the current version since then.

    foreman start

A basic rack server runs in this mode, as it does in production on heroku. The entry point is [http://localhost:7000/](http://localhost:7000/). Ideally the site will be migrated directly to S3 in the near future!

## Building the assets

A precompiled, production package of every target builds can be created by running:

    rake assets:build

This is equivalent to running:

    npm run clean && npm run build

The compiled output can be found in the `/build` directory.

### Shrinkwrap

To update `npm-shrinkwrap.json` after adding, removing or updating dependencies, run `npm run shrink`.
