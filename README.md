
# react-native-pay-u-money-lib

## Getting started

`$ npm install react-native-pay-u-money-lib --save`

### Mostly automatic installation

`$ react-native link react-native-pay-u-money-lib`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-pay-u-money-lib` and add `RNPayUMoneyLib.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNPayUMoneyLib.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNPayUMoneyLibPackage;` to the imports at the top of the file
  - Add `new RNPayUMoneyLibPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-pay-u-money-lib'
  	project(':react-native-pay-u-money-lib').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-pay-u-money-lib/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-pay-u-money-lib')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNPayUMoneyLib.sln` in `node_modules/react-native-pay-u-money-lib/windows/RNPayUMoneyLib.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Pay.U.Money.Lib.RNPayUMoneyLib;` to the usings at the top of the file
  - Add `new RNPayUMoneyLibPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNPayUMoneyLib from 'react-native-pay-u-money-lib';

// TODO: What to do with the module?
RNPayUMoneyLib;
```
  