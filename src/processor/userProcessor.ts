import { RequestPayload } from "../index.js";
import { getUser, hasUser, registerUser, UserSignInPayload, UserSignUpPayload } from "../storage/users.js";


export const signUp = (payload: UserSignUpPayload): RequestPayload => {
    if (hasUser(payload.address)) {
        return { status: 409, msg: "already registered" };
    };
    registerUser(payload.address);
    return { status: 200, msg: "ok" };
};

export const signIn = (payload: UserSignInPayload): RequestPayload => {
    if (!hasUser(payload.address)) {
        return { status: 403, msg: "not registered" };
    }
    return { status: 200, msg: "ok" };
};

export const getNonce = (address: string): RequestPayload => {
    console.log(address);
    if (!hasUser(address)) {
        return { status: 400, msg: "not registered" };
    }
    const user = getUser(address)!;
    return { status: 200, msg: user.walletNonce };
};