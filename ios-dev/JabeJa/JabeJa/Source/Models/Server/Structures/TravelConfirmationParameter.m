//
//  TravelConfirmationParameter.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "TravelConfirmationParameter.h"
#import "AuthUtils.h"

@implementation TravelConfirmationParameter

- (NSDictionary*)toDictionary {
    return @{
             @"userFbId" : [[AuthUtils instance] getFacebookID],
             @"userName" : [self getUserName],
             @"userEmail" : [AuthUtils instance].userEmail,
             @"userPhone" : self.userPhone,
             @"deliveryType" : [self getDeliveryType],
             @"source" : self.source,
             @"dest" : self.destination,
             @"travelDate": [self getDate],
             @"comment" : @"",
             };
}

- (NSString*)getUserName {
    NSString* first = [AuthUtils instance].userFirstName;
    NSString* middle = [AuthUtils instance].userMiddleName;
    NSString* last = [AuthUtils instance].userLastName;

    NSMutableString* result = [[NSMutableString alloc] init];

    if (first != nil && ![first isEqualToString:@""]) {
        [result appendString:first];
    }

    if (middle != nil && ![middle isEqualToString:@""]) {
        if (result.length > 0) {
            [result appendString:@" "];
        }
        [result appendString:middle];
    }

    if (last != nil && ![last isEqualToString:@""]) {
        if (result.length > 0) {
            [result appendString:@" "];
        }
        [result appendString:last];
    }

    return result;
}

- (NSString*)getDate {
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];

    [dateFormat setDateFormat:@"yyyy-MM-dd"];

    return [dateFormat stringFromDate:self.travelDate];
}

- (NSString*)getDeliveryType {
    NSMutableString* result = [[NSMutableString alloc] init];

    if (self.hasBox) {
        if (result.length > 0) {
            [result appendString:@"_"];
        }

        [result appendString:@"box"];
    }
    
    if (self.hasDocument) {
        if (result.length > 0) {
            [result appendString:@"_"];
        }

        [result appendString:@"document"];
    }
    
    return result;
}

@end
