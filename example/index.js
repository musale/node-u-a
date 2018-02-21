'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const USSD = require('../dist').default;

const filePath = "./test.yml"
const app = new Koa();
const router = new Router();
const menuScreens = new USSD(filePath);

router.post('/ussd', async (ctx, next) => {
  menuScreens.run(ctx.body, response => {
    ctx.body = response;
  });
});

app.use(router.routes());
app.listen(3000);
