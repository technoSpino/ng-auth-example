var winston = require('winston');
var request = require('request')
var promise = Promise;
var purest = require('purest')({ request, promise })
var config = require('@purest/providers')
var google = purest({ provider: 'google', config })

class GrantController {
    constructor() {

    }
    async handleGoogleCallback(ctx, next) {
        winston.debug("Auth accepted by google");
        winston.debug(ctx.request.query.access_token);
        try {
            var req = await google
                .query('plus')
                .get('people/me')
                .auth(ctx.request.query.access_token)
                .request();
            winston.info("Userinfo retrieved");
            winston.debug(req[0])
            winston.debug(req[1])
            var me = req[1];
            if (me.errors) throw me.errors;
            //build session
            ctx.session.name = me.displayName;
            ctx.session.image = me.image.url;
            ctx.session.email = me.emails[0].value;
            ctx.status = 200;
            ctx.redirect('http://localhost:4200/account')
        }
        catch (error) {
            winston.error("Error retrieving google oauth")
            winston.error(error);
            throw error;
        }

    }

    async getAccountInfo(ctx, next) {
        var accountInfo = {
            name: ctx.session.name,
            image: ctx.session.image,
            email: ctx.session.email
        }

        ctx.status = 200
        ctx.body = accountInfo
    }

    async isAuthenticated(ctx, next) {
        var isAuthed = false
        if (ctx.session.name) {
            isAuthed = true
        }
        ctx.status = 200
        ctx.body = {
            success: isAuthed,
            loginURL: 'connect/google'
        }

    }
}
module.exports = GrantController;