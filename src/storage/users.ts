/*
    This code is not production ready, it is just 
    a simple example to show how the auth process works.
    For a real application you should use a DB. 
*/

import { randomUUID } from "crypto";

export type UserPayload = {
    ethereumPublicAddress: string,
};

type User = {
    ethereumPublicAddress: string,
    walletNonce: string;
};

const userList: User[] = [];

export const getUser = (ethereumPublicAddress: string) => {
    const user = userList.find(u => u.ethereumPublicAddress === ethereumPublicAddress);
    return user;
};

export const hasUser = (ethereumPublicAddress: string) => {
    return userList.find(u => u.ethereumPublicAddress === ethereumPublicAddress) !== undefined;
};

export const registerUser = (ethereumPublicAddress: string): string => {
    const walletNonce = randomUUID();
    userList.push({ ethereumPublicAddress: ethereumPublicAddress, walletNonce: walletNonce });
    return walletNonce;
};