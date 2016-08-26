//
//  SearchTripResponse.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SearchTripResponse.h"

@implementation TravelInfo

@end

@implementation SearchTripResponse

- (void)load:(NSDictionary *)responseArray {
    NSMutableArray* result = [[NSMutableArray alloc] init];
    NSArray* list = (NSArray*)responseArray;

    for (int i = 0; i < list.count; i++) {
        TravelInfo* info = [[TravelInfo alloc] init];
        [result addObject:info];

        NSDictionary* response = [list objectAtIndex:i];

        info.userFacebookID = STRING(@"userFbId");
        info.userName = STRING(@"userName");
        info.userPhone = STRING(@"userPhone");
        info.userEmail = STRING(@"userEmail");

        NSArray* deliveryTypes = [response objectForKey:@"deliveryType"];
        info.hasBox = [self hasType:@"box" inList:deliveryTypes];
        info.hasDocument = [self hasType:@"document" inList:deliveryTypes];
        info.source = STRING(@"source");
        info.destination = STRING(@"dest");
        info.travelDate = [self dateFromString:STRING(@"travelDate")];
        info.serviceCharge = INT(@"serviceCharge");
    }

    self.trips = result;
}

- (NSDate*)dateFromString:(NSString*)date {
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];

    [dateFormat setDateFormat:@"yyyy-MM-dd"];

    return [dateFormat dateFromString:date];
}

- (BOOL)hasType:(NSString*)type inList:(NSArray*)list {
    BOOL result = NO;

    for (int i = 0; i < list.count && !result; i++) {
        result = [[list objectAtIndex:i] isEqualToString:type];
    }

    return result;
}

@end
