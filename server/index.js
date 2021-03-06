const Koa = require('koa');
const views = require('koa-views');
const router = require('koa-router')();
const Static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const Config = require('./config');
const route = require('./route');
const ROOT_PATH = '../';
const app = new Koa();

app.use(bodyParser({
    strict: true
}));

app.use(Static(
    path.join(__dirname, `${ROOT_PATH}dist`)
));

app.use(Static(
    path.join(__dirname, `${ROOT_PATH}dist/views`)
));

app.use(views(path.join(__dirname, `${ROOT_PATH}dist/views`), {
  // map : {html:'ejs'}
}));

// route
router.get('/', async (ctx, next)=> {
    await ctx.render('home/index.html');
    await next();
})


app.use(router.routes()).use(router.allowedMethods());

app.listen(Config.port);
