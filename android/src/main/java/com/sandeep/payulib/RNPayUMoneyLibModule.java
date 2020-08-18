
package com.sandeep.payulib;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.payumoney.core.PayUmoneySdkInitializer.PaymentParam;
import com.payumoney.core.entity.TransactionResponse;
import com.payumoney.sdkui.ui.utils.PayUmoneyFlowManager;

import static android.app.Activity.RESULT_OK;

public class RNPayUMoneyLibModule extends ReactContextBaseJavaModule implements ActivityEventListener {
  private final ReactApplicationContext reactContext;

  public RNPayUMoneyLibModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    reactContext.addActivityEventListener(this);
  }

  @Override
  public void initialize() {
    super.initialize();
    reactContext.addActivityEventListener(this);
  }

  @NonNull
  @Override
  public String getName() {
    return "RNPayUMoneyLib";
  }

  @ReactMethod
  public void payUMoneyLib(String data) {
    RNPayUMoneyLibModel payUData = new Gson().fromJson(data, RNPayUMoneyLibModel.class);
    PaymentParam.Builder builder = new PaymentParam.Builder();
    builder.setAmount(payUData.amount)                          // Payment amount
            .setTxnId(payUData.txnId)                           // Transaction ID
            .setPhone(payUData.phone)                           // User Phone number
            .setProductName(payUData.productName)               // Product Name or description
            .setFirstName(payUData.firstName)                   // User First name
            .setEmail(payUData.email)                           // User Email ID
            .setsUrl(payUData.successUrl)                       // Success URL (surl)
            .setfUrl(payUData.failedUrl)                        //Failure URL (furl)
            .setUdf1(payUData.udf1)
            .setUdf2(payUData.udf2)
            .setUdf3(payUData.udf3)
            .setUdf4(payUData.udf4)
            .setUdf5(payUData.udf5)
            .setUdf6(payUData.udf6)
            .setUdf7(payUData.udf7)
            .setUdf8(payUData.udf8)
            .setUdf9(payUData.udf9)
            .setUdf10(payUData.udf10)
            .setIsDebug(payUData.isSandbox)                    // Integration environment - true (Debug)/ false(Production)
            .setKey(payUData.key)                              // Merchant key
            .setMerchantId(payUData.merchantId);               // Merchant ID

    try {
      final PaymentParam paymentParam = builder.build();
      paymentParam.setMerchantHash(payUData.hash);

      Log.e("Activity", getCurrentActivity().toString());
      this.dispatchThread((Runnable) (new Runnable() {
        public final void run() {
          PayUmoneyFlowManager.startPayUMoneyFlow(paymentParam, getCurrentActivity(), R.style.AppTheme_default, true);
        }
      }));
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    if (requestCode == PayUmoneyFlowManager.REQUEST_CODE_PAYMENT && resultCode == RESULT_OK && data != null) {
      TransactionResponse transactionResponse = data.getParcelableExtra(PayUmoneyFlowManager.INTENT_EXTRA_TRANSACTION_RESPONSE);
      if (transactionResponse != null && transactionResponse.getPayuResponse() != null) {
        String payUResponse = transactionResponse.getPayuResponse();
        if (transactionResponse.getTransactionStatus().equals(TransactionResponse.TransactionStatus.SUCCESSFUL) || transactionResponse.getTransactionStatus().equals(TransactionResponse.TransactionStatus.FAILED)) {
          sendEvent("PAYU_PAYMENT_SUCCESS", "{\"response\":" + payUResponse + "}");
        } else {
          sendEvent("PAYU_PAYMENT_FAILED", "{\"success\":false}");
        }
      } else {
        sendEvent("PAYU_PAYMENT_FAILED", "{\"success\":false}");
      }
    }else{
      sendEvent("PAYU_PAYMENT_FAILED", "{\"success\":false}");
    }
  }

  public void onNewIntent (Intent intent){

  }

  private void sendEvent (String eventName, String params){
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
  }

  protected void dispatchThread (Runnable runnable){
    if (runnable == null) {
      return;
    }
    reactContext.runOnUiQueueThread(runnable);
  }
}