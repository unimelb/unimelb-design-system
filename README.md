# Unimelb Design System

**Copyright &copy; 2016 The University of Melbourne**

The contents of this repository have been produced by The University of Melbourne for internal use and must not be distributed without the express permission of The University of Melbourne.

## Set-up
To set up the design system locally, run:

```
git clone git@github.com:marcom-unimelb/unimelb-design-system.git
cd unimelb-design-system
cp .env.example .env
bundle install
npm install
```

## Development
1. Run `foreman start` or `npm start`
2. Visit [http://localhost:7001/](http://localhost:7001/)

### Shrinkwrap
`npm-shrinkwrap.json` must be kept up to date when adding, removing or updating dependencies. NPM will take care of it for you automatically in some cases. If unsure, use `npm run shrink` to delete and recreate the shrinkwrap file.

## Building the assets
Run `rake assets:build` or `npm run build`. The compiled targets can be found in the `/build` directory.

## Updating the legacy injection (< v6.0)
1. Create a local branch off the most recent legacy tag - e.g. `git checkout tags/v5.0.1 -b fix-something-in-injection`
2. Recreate `.env` from `.env.example` and set `CDNURL` to `"https://d2h9b02ioca40d.cloudfront.net/shared"`
3. Fix whatever you need to fix in the injection and commit the changes.
4. Run `NODE_ENV=production npm run build` to compile the targets.
5. Copy the files to slingshot, test your changes and deploy.
6. Create a tag from your branch - e.g. `git tag v5.0.2`, then `git push origin v5.0.2`.
7. Delete your local branch - e.g. `git branch -d v5.0.2`.
