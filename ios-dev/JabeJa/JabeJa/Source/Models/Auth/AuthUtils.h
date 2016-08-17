//
//  AuthUtils.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AuthUtils : NSObject

+ (AuthUtils*)instance;

@property (assign, nonatomic, readonly) BOOL isFacebook;
@property (assign, nonatomic, readonly) BOOL isGooglePlus;

- (BOOL)isSignedIn;

@end
