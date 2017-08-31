An application to show 2 different types of authentication with a working connection to google SSO

The server side is a koa.js application running with Grant for connection to google SSO.

The front end in an angular application showcasing both auth guards and http interceptors.

### Set UP
* copy over `./koa/config.sample.json` to `./koa/config.json` and replace google app keys
* execute `docker-compose build && docker-compose up` to build and run the servers

http://localhost:4200 will be the front end

http://localhost:3000 will be the backend koa server