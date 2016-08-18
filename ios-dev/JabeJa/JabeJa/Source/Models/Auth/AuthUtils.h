//
//  AuthUtils.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>

#define FACEBOOK_REQUIRED_PERMISSIONS @[@"public_profile", @"email", @"user_friends"]
typedef void (^ AUTH_LOAD_INFO_CALLBACK)(BOOL result);

typedef enum {
    AuthTypeFacebook,
} AuthType;

@interface AuthUtils : NSObject

+ (AuthUtils*)instance;

@property (assign, nonatomic, readonly) BOOL isFacebook;
@property (assign, nonatomic, readonly) BOOL isGooglePlus;

@property (strong, nonatomic) NSString* userEmail;
@property (strong, nonatomic) NSString* userFirstName;
@property (strong, nonatomic) NSString* userLastName;
@property (strong, nonatomic) NSString* userMiddleName;

- (BOOL)isSignedIn;
- (void)fetchUserInformations:(AuthType)type withCallback:(AUTH_LOAD_INFO_CALLBACK)callback;
- (void)signOut;

+ (BOOL)hasRequiredPermissionsFromFacebook:(FBSDKLoginManagerLoginResult*)result;

@end
