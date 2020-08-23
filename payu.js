import { NativeModules, NativeEventEmitter } from 'react-native';
import {sha512} from "js-sha512";

const { RNPayU } = NativeModules;
const RNEvent = new NativeEventEmitter(RNPayU);

export default class PayU{
    static startPayment(payUData){
        payUData = getDefault(payUData);
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
                removeListeners();
            });
            RNEvent.addListener('PAYMENT_FAILED', (responseData) => {
                reject({status: false});
                removeListeners();
            });

            RNPayU.start(JSON.stringify(payUData));
        });
    }

    static getHash(payUData){
        payUData = getDefault(payUData);
        const hashString = `${payUData.key}|${payUData.txnId}|${payUData.amount}|${payUData.productName}|${payUData.firstName}|${payUData.email}|${payUData.udf1}|${payUData.udf2}|${payUData.udf3}|${payUData.udf4}|${payUData.udf5}|${payUData.udf6}|${payUData.udf7}|${payUData.udf8}|${payUData.udf9}|${payUData.udf10}|${payUData.salt}`;
        return sha512(hashString);
    }
}

function getDefault(payUData) {
    payUData.udf1 = (payUData.udf1)? payUData.udf1 : "";
    payUData.udf2 = (payUData.udf2)? payUData.udf2 : "";
    payUData.udf3 = (payUData.udf3)? payUData.udf3 : "";
    payUData.udf4 = (payUData.udf4)? payUData.udf4 : "";
    payUData.udf5 = (payUData.udf5)? payUData.udf5 : "";
    payUData.udf6 = (payUData.udf6)? payUData.udf6 : "";
    payUData.udf7 = (payUData.udf7)? payUData.udf7 : "";
    payUData.udf8 = (payUData.udf8)? payUData.udf8 : "";
    payUData.udf9 = (payUData.udf9)? payUData.udf9 : "";
    payUData.udf10 = (payUData.udf10)? payUData.udf10 : "";
    payUData.isSandbox = (payUData.isSandbox) ? payUData.isSandbox: false;
    return payUData;
}

function removeListeners(){
    RNEvent.removeAllListeners('PAYMENT_SUCCESS');
    RNEvent.removeAllListeners('PAYMENT_FAILED');
}