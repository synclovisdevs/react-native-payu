# react-native-payUMoneyLib

## Getting started

`$ npm install react-native-payUMoneyLib --save`

### Installation

####Only For RN <= 0.59

`$ react-native link react-native-payUMoneyLib`


#### iOS

#####Add following line in Podfile

`pod 'PayUmoney_PnP'`

#####Then, run the following command:

`$ pod install`

####RN >= 0.60

`No need to do anything`

#### iOS Manual Installation

#####Add following line in Podfile


```
pod 'react-native-payUMoneyLib', :path => '../node_modules/react-native-payUMoneyLib'`
pod 'PayUmoney_PnP'
```
#####Then, run the following command:

`$ pod install`

#### Android Manual Installation

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNPayUMoneyLibPackage;` to the imports at the top of the file
  - Add `new RNPayUMoneyLibPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-payUMoneyLib'
  	project(':react-native-payUMoneyLib').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-payUMoneyLib/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-payUMoneyLib')
  	```

## Usage
```javascript
import RNPayUMoneyLib from 'react-native-payUMoneyLib';

// TODO: What to do with the module?
RNPayUMoneyLib;
```

