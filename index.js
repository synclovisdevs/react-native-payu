//  Copyright ©2020 Sandeep Mishra. All rights reserved.

import { NativeModules, NativeEventEmitter } from 'react-native';
import {sha512} from "js-sha512";

const { RNPayU } = NativeModules;
const RNEvent = new NativeEventEmitter(RNPayU);

const removeSubscriptions = () => {
    RNEvent.removeAllListeners('PAYMENT_SUCCESS');
    RNEvent.removeAllListeners('PAYMENT_FAILED');
};

const HashSequence = payUData => {
    payUData = getDafault(payUData);
    const hashString = `${payUData.key}|${payUData.txnId}|${payUData.amount}|${payUData.productName}|${payUData.firstName}|${payUData.email}|${payUData.udf1}|${payUData.udf2}|${payUData.udf3}|${payUData.udf4}|${payUData.udf5}|${payUData.udf6}|${payUData.udf7}|${payUData.udf8}|${payUData.udf9}|${payUData.udf10}|${payUData.salt}`;
    return sha512(hashString);
}

const PayU = (payUData) => {
    payUData = getDafault(payUData);
    return new Promise((resolve, reject) => {
        RNEvent.addListener('PAYMENT_SUCCESS', (responseData) => {
            if (typeof responseData !== 'object') {
                responseData = JSON.parse(responseData);
            }

            if (responseData.payUResponse.result.status === "success"){
                resolve(Object.assign(Object.assign({}, responseData), { status: true }));
            }else{
                resolve(Object.assign(Object.assign({}, responseData), { status: false, error_message: responseData.payUResponse.result.error_Message}));
            }
            removeSubscriptions();
        });
        RNEvent.addListener('PAYMENT_FAILED', (responseData) => {
            reject({status: false});
            removeSubscriptions();
        });

        RNPayU.start(JSON.stringify(payUData));
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

export default PayU;
export {HashSequence}