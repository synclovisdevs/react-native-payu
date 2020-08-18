//  RNPayUMoneyLib.m
//  Copyright ©2020 Sandeep Mishra. All rights reserved.

#import "RNPayUMoneyLib.h"
#import <PlugNPlay/PlugNPlay.h>
#import <React/RCTUtils.h>

@implementation RNPayUMoneyLib

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents{
    return @[@"PAYU_PAYMENT_SUCCESS", @"PAYU_PAYMENT_FAILED"];
}

RCT_EXPORT_METHOD(payUMoneyLib :(NSString *)payUData) {

    NSData *jsonPayUData = [payUData dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error;
    NSDictionary *payUMoneyData = (NSDictionary *)[NSJSONSerialization JSONObjectWithData:jsonPayUData options:0 error:&error];

    PUMTxnParam *txnParam= [[PUMTxnParam alloc] init];
    //Set the parameters
    txnParam.phone = payUMoneyData[@"phone"];
    txnParam.email = payUMoneyData[@"email"];
    txnParam.amount = payUMoneyData[@"amount"];
    txnParam.environment = [payUMoneyData[@"isSandbox"] intValue] == 1?PUMEnvironmentTest:PUMEnvironmentProduction;    txnParam.firstname = payUMoneyData[@"firstName"];
    txnParam.key = payUMoneyData[@"key"];
    txnParam.merchantid = payUMoneyData[@"merchantId"];
    txnParam.txnID = payUMoneyData[@"txnId"];
    txnParam.surl = payUMoneyData[@"successUrl"];
    txnParam.furl = payUMoneyData[@"failedUrl"];
    txnParam.productInfo = payUMoneyData[@"productName"];
    txnParam.udf1 = payUMoneyData[@"udf1"];
    txnParam.udf2 = payUMoneyData[@"udf2"];
    txnParam.udf3 = payUMoneyData[@"udf3"];
    txnParam.udf4 = payUMoneyData[@"udf4"];
    txnParam.udf5 = payUMoneyData[@"udf5"];
    txnParam.udf6 = payUMoneyData[@"udf6"];
    txnParam.udf7 = payUMoneyData[@"udf7"];
    txnParam.udf8 = payUMoneyData[@"udf8"];
    txnParam.udf9 = payUMoneyData[@"udf9"];
    txnParam.udf10 = payUMoneyData[@"udf10"];
    txnParam.hashValue = payUMoneyData[@"hash"];

    dispatch_sync(dispatch_get_main_queue(), ^{
        [PlugNPlay setDisableCompletionScreen:YES];
        [PlugNPlay presentPaymentViewControllerWithTxnParams:txnParam onViewController:RCTPresentedViewController() withCompletionBlock:^(NSDictionary *paymentResponse, NSError *error, id extraParam) {

            if (error) {
                [self sendEventWithName:@"PAYU_PAYMENT_FAILED" body:@{@"success": @false}];
            } else {
                NSString *message;
                if ([paymentResponse objectForKey:@"result"] && [[paymentResponse objectForKey:@"result"] isKindOfClass:[NSDictionary class]]) {
                    message = [[paymentResponse objectForKey:@"result"] valueForKey:@"error_message"];
                    if ([message isEqual:[NSNull null]] || [message length] == 0 || [message isEqualToString:@"No Error"]) {
                        [self sendEventWithName:@"PAYU_PAYMENT_SUCCESS" body:@{@"response": paymentResponse}];
                    }
                } else {
                    [self sendEventWithName:@"PAYU_PAYMENT_FAILED" body:@{@"success": @false}];
                }
            }
        }];
    });

}

@end

