# react-native-payu

<img src='https://img.shields.io/badge/license-MIT-blue.svg' />  <a href="https://www.npmjs.com/package/react-native-payu"><img alt="npm dowloads" src="https://img.shields.io/npm/dm/react-native-payu.svg"/></a> <a href="https://www.npmjs.com/package/react-native-payu"><img alt="npm version" src="https://badge.fury.io/js/react-native-payu.svg"/></a> [![Build Status](https://travis-ci.org/synclovisdevs/react-native-payu.svg?branch=master)](https://travis-ci.org/synclovisdevs/react-native-payu) [![Greenkeeper badge](https://badges.greenkeeper.io/synclovisdevs/react-native-payu.svg)](https://greenkeeper.io/)

-----
## Getting started

`$ npm install react-native-payu --save`

### Installation

#### Only For RN <= 0.59

`$ react-native link react-native-payu`


#### iOS

##### Add following line in Podfile

`pod 'PayUmoney_PnP'`

##### Then, run the following command:

`$ pod install`

#### RN >= 0.60

`No need to do anything`

#### iOS Manual Installation

##### Add following line in Podfile


```
pod 'react-native-payu', :path => '../node_modules/react-native-payu'`
pod 'PayUmoney_PnP'
```
##### Then, run the following command:

`$ pod install`

#### Android Manual Installation

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNPayUPackage;` to the imports at the top of the file
  - Add `new RNPayUPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-payu'
  	project(':react-native-payu').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-payu/android')
  	```
3. Insert the following lines inside the dependencies block in 

    `android/app/build.gradle`:
    
  	```
    implementation project(':react-native-payu')
  	```

## Usage
1. Get PayU data:
    ````
   Create your Merchant account in PayU website. https://www.payu.in
   
   Under Profile you will get your Merchant ID
   
   Under DASHBOARD you will get Merchnat KEY and SALT Key.
   
   Also Test Card details are available which can be used for testing.
   ````
1. Import PayUMoneyLib module to your component:

     ```
     import PayUMoneyLib from 'react-native-payu';
     ```
 
 2. Call `PayU()` method with the payment `options`. Method
 returns a **Promise** 
 ```js
 const payUData = {
     amount: '100',
     txnId: '642346786768',
     productName: 'product_name',
     firstName: 'First Name',
     email: 'abc@payu.in',
     phone: '9444444444',  //Number should be valid in test mode also
     merchantId: 'Your Merchant Id',
     key: 'Your Merchant Key',
     successUrl: 'Your success URL or success webhook URL',
     failedUrl: 'Your failed URL or failed webhook URL',
     isSandox: true,  //In case of production or Live set false
     hash:'Hash Code' //You can check it below how to generate hash code,
 }
 // You can also add udf1 to udf10 for additional info

 PayU(payUData).then((data) => {
     // Payment Success
     if (data.status){
         // Payment Success
         console.log('PAYMENT_SUCCESS', data.payUResponse);
     }else{
        // Payment Failed
         console.log('PAYMENT_FAILED', data.error_message);
     }
 }).catch((e) => {
     // Payment Failed
     console.log("PAYMENT_FAILED",e);
 });
 ```
 
 ### Validating Hash
 > Don't use in production just for testing purpose
 
 ```js
 import {HashSequence} from 'react-native-payu';
 
 HashSequence({
     key: "Your Merchent Key",
     amount: "100",
     email: "abc@payu.in",
     txnId: "642346786768",
     productName: "product_name",
     firstName: "Your First Name",
     salt: "Salt",
 })
 
 // output: 43dfxcvdxd345tre534g545gb54e4g646h7nfgr35e060c3bfc0e489290e7c902750d5db3fc8be2f180daf4d534d7b9bef46fa0158a4c8a057b61
 ```
 
 Server side function to get Hash Code
 
 ```js
 function payUHash(payUData){
     const hashString = `${payUData.key}|${payUData.txnId}|${payUData.amount}|${payUData.productName}|${payUData.firstName}|${payUData.email}|${payUData.udf1}|${payUData.udf2}|${payUData.udf3}|${payUData.udf4}|${payUData.udf5}|${payUData.udf6}|${payUData.udf7}|${payUData.udf8}|${payUData.udf9}|${payUData.udf10}|${payUData.salt}`;
     //In case you are not passing udf values then set it as empty string 
     return sha512(hashString);
 }
 
 ```
 
 ### Troubleshooting    
 
Below is the test card details for transaction in the testing mode. 
 ```js
   Card No - 5123 4567 8901 2346
   Expiry - 11/22 // any future data
   CVV - 123
 ```

