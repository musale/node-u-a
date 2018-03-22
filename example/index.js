'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const USSD = require('../dist').default;

const filePath = './test.yml';
const app = new Koa();
const router = new Router();
const menuScreens = new USSD(filePath);

app.use(BodyParser());

router.post('/ussd', async (ctx, next) => {
  menuScreens.run(ctx.request.body, (err, response) => {
    if (err) console.error(err);
    else ctx.body = response;
    next();
  });
});

app.use(router.routes());
app.listen(3000);
