import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import { getNonce, signIn, signUp } from './processor/userProcessor.js';
import { UserSignInPayload, UserSignUpPayload } from './storage/users.js';

const app = new Koa();
const router = new Router();

export type RequestPayload = {
    msg: string;
    status: number;
};

router.post("/signin", async (ctx, next) => {
    const data = <UserSignInPayload>ctx.request.body;
    const result = signIn(data);
    ctx.body = result;
    ctx.status = result.status;
    await next();
});

router.post("/register", async (ctx, next) => {
    const data = <UserSignUpPayload>ctx.request.body;
    const result = signUp(data);
    ctx.body = result;
    ctx.status = result.status;
    await next();
});

router.get("/nonce/:address", async (ctx, next) => {
    const address = ctx.params.address;
    const result = getNonce(address);
    ctx.body = result;
    ctx.status = result.status;
    await next();
});

app.use(bodyParser());
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());
app.listen(3005, () => {
    console.log("Server is ready.");
});