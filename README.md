# Unimelb Design System

## Copyright Notice
Copyright 2015 The University of Melbourne

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

## Development environment

    git clone git@github.com:marcom-unimelb/unimelb-design-system.git
    cd unimelb-design-system
    bundle install
    ./bin/server

The development site will be available at [http://localhost:3000/](http://localhost:3000/)

## Deploying to production

Setup a `.env` with the following keys:

    AWS_ACCESS_KEY_ID='...key id...'
    AWS_SECRET_ACCESS_KEY='...secret key...'
    FOG_DIRECTORY='...bucket...'

Run the following command:

    bundle exec rake assets:deploy VERSION=...

