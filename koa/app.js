var Koa = require('koa')
    , session = require('koa-session')
    , mount = require('koa-mount');
var Grant = require('grant-koa');
var config = require('./config.json');
var grant = new Grant(config[process.env.NODE_ENV || 'development'])
var health = require('koa-ping');
var Router = require('koa-router');
var bodyParser = require('koa-body'); // allow request.body
const httpLogger = require('koa-logger')
var logger = require('./log.js');
const cors = require('kcors');

var koa = new Koa();
var router = new Router();


const GrantController = require('./auth/grant.routes.js');
const grantController = new GrantController();

router.get("/handle_google_callback", (ctx, next) => grantController.handleGoogleCallback(ctx, next));
router.get("/isauthenticated", (ctx, next) => grantController.isAuthenticated(ctx, next));
router.get("/forbidden", (ctx, next) => ctx.status = 403)
var securedRoutes = new Router();
securedRoutes.get("/account", (ctx, next) => grantController.getAccountInfo(ctx, next));
securedRoutes.get("/admin", (ctx, next) => {
    ctx.status = 200
    ctx.body = "secrets"
})
koa.keys = ['grant']
koa.use(cors({ credentials: true }));
koa.use(session(koa))
koa.use(httpLogger());
// mount grant
koa.use(bodyParser()); // make request.body a thing
koa.use(health()); // creates a /ping healthcheck
koa.use(mount(grant))
koa.use(router.routes());
koa.use(
    async (ctx, next) => {
        if (ctx.session.name) {
            await next()
        }
        else {
            ctx.status = 403
        }
    })
koa.use(securedRoutes.routes());

koa.listen(3000);

logger.info("Listening on 3000");
