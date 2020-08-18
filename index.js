//  Copyright ©2020 Sandeep Mishra. All rights reserved.

import { NativeModules, NativeEventEmitter } from 'react-native';
import {sha512} from "js-sha512";

const { RNPayUMoneyLib } = NativeModules;
const RNEvent = new NativeEventEmitter(RNPayUMoneyLib);

const removeSubscriptions = () => {
    RNEvent.removeAllListeners('PAYU_PAYMENT_SUCCESS');
    RNEvent.removeAllListeners('PAYU_PAYMENT_FAILED');
};

const HashGenerator = payUData => {
    payUData = getDafault(payUData);
    const hashString = `${payUData.key}|${payUData.txnId}|${payUData.amount}|${payUData.productName}|${payUData.firstName}|${payUData.email}|${payUData.udf1}|${payUData.udf2}|${payUData.udf3}|${payUData.udf4}|${payUData.udf5}|${payUData.udf6}|${payUData.udf7}|${payUData.udf8}|${payUData.udf9}|${payUData.udf10}|${payUData.salt}`;
    return sha512(hashString);
}

const PayUMoneyLib = (payUData) => {
    payUData = getDafault(payUData);
    return new Promise((resolve, reject) => {
        RNEvent.addListener('PAYU_PAYMENT_SUCCESS', (data) => {
            if (typeof data !== 'object') {
                data = JSON.parse(data);
            }
            resolve(Object.assign(Object.assign({}, data), { success: true }));
            removeSubscriptions();
        });
        RNEvent.addListener('PAYU_PAYMENT_FAILED', (data) => {
            if (typeof data !== 'object') {
                data = JSON.parse(data);
            }
            reject(data);
            removeSubscriptions();
        });

        console.log("sdxgfcgnsedfxg35645yr", payUData)
        RNPayUMoneyLib.payUMoneyLib(JSON.stringify(payUData));
    });
};

const getDafault = payUData => {
    payUData.udf1 = (payUData.udf1)? payUData.udf1 : "";
    payUData.udf2 = (payUData.udf2)? payUData.udf2 : "";
    payUData.udf3 = (payUData.udf3)? payUData.udf3 : "";
    payUData.udf4 = (payUData.udf4)? payUData.udf4 : "";
    payUData.udf5 = (payUData.udf5)? payUData.udf5 : "";
    payUData.udf6 = (payUData.udf6)? payUData.udf6 : "";
    payUData.udf7 = (payUData.udf7)? payUData.udf7 : "";
    payUData.udf8 = (payUData.udf8)? payUData.udf8 : "";
    payUData.udf9 = (payUData.udf9)? payUData.udf9 : "";
    payUData.udf10 = (payUData.udf10)? payUData.udf1 : "";
    payUData.isSandbox = (payUData.isSandbox) ? payUData.isSandbox: false;
    return payUData;
}

export default PayUMoneyLib;
export {HashGenerator}