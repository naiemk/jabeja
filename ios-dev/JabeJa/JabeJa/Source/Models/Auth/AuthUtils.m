//
//  AuthUtils.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "AuthUtils.h"

@implementation AuthUtils

static AuthUtils* _instance;

- (instancetype)init {
    self = [super init];

    if (self) {

    }

    return self;
}

+ (AuthUtils*)instance {
    if (_instance == nil) {
        _instance = [[AuthUtils alloc] init];
    }

    return _instance;
}

- (BOOL)isSignedIn {
    return self.isFacebook || self.isGooglePlus;
}

- (BOOL)isFacebook {
    return [Settings getFacebookAccessToken] != nil;
}

- (BOOL)isGooglePlus {
    return [Settings getGooglePlusAccessToken] != nil;
}

@end
