/*
    This code is not production ready, it is just 
    a simple example to show how the auth process works.
    For a real application you should use a DB. 
*/

import { randomUUID } from "crypto";

export type UserSignInPayload = {
    address: string,
    signature: string;
};

export type UserSignUpPayload = {
    address: string;
};

type User = {
    address: string,
    walletNonce: string;
};

const userList: User[] = [];

export const getUser = (address: string) => {
    const user = userList.find(u => u.address === address);
    return user;
};

export const hasUser = (address: string) => {
    return userList.find(u => u.address === address) !== undefined;
};

export const registerUser = (address: string) => {
    userList.push({ address: address, walletNonce: randomUUID() });
};