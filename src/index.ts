import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { signIn, signUp } from './processor/userProcessor.js';
import { UserPayload } from './storage/users.js';

const app = new Koa();
const router = new Router();

export type RequestPayload = {
    msg: string;
    status: string;
};

router.post("/signin", async (ctx, next) => {
    const data = <UserPayload>ctx.request.body;
    ctx.body = signIn(data);
    await next();
});

router.post("/register", async (ctx, next) => {
    const data = <UserPayload>ctx.request.body;
    ctx.body = signUp(data);
    await next();
});

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3005, () => {
    console.log("Server is ready.");
});