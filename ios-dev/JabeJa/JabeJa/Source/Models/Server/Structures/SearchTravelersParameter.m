//
//  SearchTravelersParameter.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SearchTravelersParameter.h"

@implementation SearchTravelersParameter

- (NSDictionary*)toDictionary {
    return @{
             @"type" : [self getDeliveryType],
             @"source" : self.source,
             @"dest" : self.destination,
             @"date": [self getDate],
             };
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

- (NSString*)getDate {
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];

    [dateFormat setDateFormat:@"yyyy-MM-dd"];

    return [dateFormat stringFromDate:self.travelDate];
}


@end
