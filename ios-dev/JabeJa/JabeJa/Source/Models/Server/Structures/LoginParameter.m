//
//  LoginParameter.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "LoginParameter.h"

@implementation LoginParameter

- (NSDictionary*)toDictionary {
    NSMutableDictionary* dic = [[NSMutableDictionary alloc] init];

    [dic setObject:self.userEmail forKey:@"email"];
    [dic setObject:self.userFirstName forKey:@"firstName"];
    [dic setObject:self.userLastName forKey:@"lastName"];
    [dic setObject:self.facebookUserID forKey:@"userFbId"];

    if (self.userMiddleName != nil) {
        [dic setObject:self.userMiddleName forKey:@"middleName"];
    }

    return dic;
}

@end
