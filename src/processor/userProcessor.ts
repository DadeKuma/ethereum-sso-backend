import { RequestPayload } from "../index.js";
import { hasUser, registerUser, UserPayload } from "../storage/users.js";


export const signUp = (user: UserPayload): RequestPayload => {
    if (hasUser(user.ethereumPublicAddress)) {
        return { status: "failure", msg: "already registered" };
    };
    const nonce = registerUser(user.ethereumPublicAddress);
    return { status: "success", msg: nonce };
};

export const signIn = (user: UserPayload): RequestPayload => {
    if (!hasUser(user.ethereumPublicAddress)) {
        return { status: "failure", msg: "not registered" };
    }
    return { status: "success", msg: "ok" };
};