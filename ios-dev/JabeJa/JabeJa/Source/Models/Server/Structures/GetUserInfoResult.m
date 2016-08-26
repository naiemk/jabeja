//
//  GetUserInfoResult.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GetUserInfoResult.h"

@implementation GetUserInfoResult

- (void)load:(NSDictionary*)response {
//    [super load:response];

    self.userEmail = STRING(@"email");
    self.userFirstName = STRING(@"firstName");
    self.userLastName = STRING(@"lastName");
    self.userMiddleName = STRING(@"middleName");
    self.userPhone = STRING(@"phone");
}

- (BOOL)hasPhoneNumber {
    if (self.userPhone == nil || [self.userPhone isEqualToString:@""]) {
        return NO;
    }

    return YES;
}

@end
