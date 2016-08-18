//
//  AuthUtils.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "AuthUtils.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>

@implementation AuthUtils

static AuthUtils* _instance;

- (instancetype)init {
    self = [super init];

    if (self) {
        self.userEmail = [Settings getUserEmail];
        self.userFirstName = [Settings getUserFirstName];
        self.userLastName = [Settings getUserLastName];
        self.userMiddleName = [Settings getUserMiddleName];
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
    BOOL hasToken = [FBSDKAccessToken currentAccessToken] != nil;

    return hasToken;
}

- (BOOL)isGooglePlus {
    return [Settings getGooglePlusAccessToken] != nil;
}

- (void)fetchUserInformations:(AuthType)type withCallback:(AUTH_LOAD_INFO_CALLBACK)callback {
    if (type == AuthTypeFacebook) {
        [self fetchUserInformationsFromFacebook:callback];
    }
}

- (void)fetchUserInformationsFromFacebook:(AUTH_LOAD_INFO_CALLBACK)callback {
    [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me" parameters:@{@"fields": @"email, first_name, last_name, middle_name"}]
     startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, id result, NSError *error) {
         if (!error) {
             self.userEmail = result[@"email"];
             self.userFirstName = result[@"first_name"];
             self.userLastName = result[@"last_name"];
             self.userMiddleName = result[@"middle_name"];
         } else {
             self.userEmail = nil;
             self.userFirstName = nil;
             self.userLastName = nil;
             self.userMiddleName = nil;
         }

         [Settings setUserEmail:self.userEmail];
         [Settings setUserFirstName:self.userFirstName];
         [Settings setUserLastName:self.userLastName];
         [Settings setUserMiddleName:self.userMiddleName];

         callback(!error);
     }];
}

+ (BOOL)hasRequiredPermissionsFromFacebook:(FBSDKLoginManagerLoginResult*)result {
    NSArray* listOfPermissions = FACEBOOK_REQUIRED_PERMISSIONS;
    BOOL hasAll = YES;

    for (int i = 0; i < listOfPermissions.count && hasAll; i++) {
        NSString* permission = [listOfPermissions objectAtIndex:i];
        hasAll = [result.grantedPermissions containsObject:permission];
    }

    return hasAll;
}

- (void)signOut {
    if (self.isFacebook) {
        [[FBSDKLoginManager new] logOut];
    }
}

@end
