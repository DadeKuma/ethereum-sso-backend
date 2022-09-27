import { bufferToHex, ecrecover, fromRpcSig, hashPersonalMessage, publicToAddress, toBuffer } from 'ethereumjs-util';
import { RequestPayload } from "../index.js";
import { getUser, hasUser, registerUser, UserSignInPayload, UserSignUpPayload } from "../storage/users.js";

export const signUp = (payload: UserSignUpPayload): RequestPayload => {
    if (hasUser(payload.address)) {
        return { status: 409, msg: "Already Registered" };
    };
    registerUser(payload.address);
    return { status: 200, msg: "Registered" };
};

export const signIn = (payload: UserSignInPayload): RequestPayload => {
    if (!hasUser(payload.address)) {
        return { status: 403, msg: "Not Registered" };
    }
    const user = getUser(payload.address)!;
    const encodedNonce = Buffer.from(user.walletNonce).toString('hex');
    const nonceBuffer = toBuffer(`0x${encodedNonce}`);
    const nonceHash = hashPersonalMessage(nonceBuffer);
    const sig = fromRpcSig(payload.signature);
    const publicKey = ecrecover(nonceHash, sig.v, sig.r, sig.s);
    const addressBuffer = publicToAddress(publicKey);
    const address = bufferToHex(addressBuffer);
    const authenticated = address.toLowerCase() === payload.address.toLowerCase();
    if (!authenticated) {
        return { status: 403, msg: "Unauthorized" };
    }
    return { status: 200, msg: "Authenticated" };
};

export const getNonce = (address: string): RequestPayload => {
    if (!hasUser(address)) {
        return { status: 400, msg: "Not Registered" };
    }
    const user = getUser(address)!;
    return { status: 200, msg: user.walletNonce };
};