# Creating a release of mapbox.js

### Before Deploying

* You need to have the AWS CLI installed. `pip install awscli`
* Write a `CHANGELOG.md` entry that describes your changes and links to
  issues in question

### Automated Deployement

`npm run release <major.minor.patch>`

### Manual Deployement

* Update `_config.yaml`, `_config.publisher-production.yml`, `_config.publisher-staging.yml`
* Build docs. `./deploy.sh v<major.minor.patch>`
* Commit docs.
* Bump version and tag. `npm version <major.minor.patch>`
* Push to Github. `git push origin publisher-production --tags`
* Build `mapbox.js` `make`
* Publish to CDN. `./deploy.sh v<major.minor.patch>`
* Publish to NPM. `mbx npm publish`