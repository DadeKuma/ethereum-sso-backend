import { RequestPayload } from "../index.js";
import { getUser, hasUser, registerUser, UserSignInPayload, UserSignUpPayload } from "../storage/users.js";


export const signUp = (payload: UserSignUpPayload): RequestPayload => {
    if (hasUser(payload.address)) {
        return { status: "failure", msg: "already registered" };
    };
    registerUser(payload.address);
    return { status: "success", msg: "ok" };
};

export const signIn = (payload: UserSignInPayload): RequestPayload => {
    if (!hasUser(payload.address)) {
        return { status: "failure", msg: "not registered" };
    }
    return { status: "success", msg: "ok" };
};

export const getNonce = (address: string): RequestPayload => {
    console.log(address);
    if (!hasUser(address)) {
        return { status: "failure", msg: "not registered" };
    }
    const user = getUser(address)!;
    return { status: "success", msg: user.walletNonce };
};