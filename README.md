# git-friend

> Github Friend Finder

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e //Not yet implemented yet

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deployment Setup
- Deployment is done through nginx server and pm2.  Nginx server is used as a reverse proxy to localhost:port. pm2 is used to run, monitor and later add as system startup for the vue application.
- Here is more on [nginx reverse proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/)
- Here is more on [pm2](http://pm2.keymetrics.io/)
- ssh into the production machine
- clone the repo using
`git clone https://github.com/soechun/git-friend.git`
- cd into the cloned folder
`cd git-friend`
- Run npm install to install required packages
`npm install`
- Install pm2 to run the app
`npm install pm2`
- Run the application
`pm2 start npm`

## Adding support for JENKINS
- Jenkins is added on port 8082
- Whenever master branch is pushed, it will trigger a build
