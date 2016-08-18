//
//  Settings.h
//  MuslimLib
//
//  Created by Mohammad Ali Yektaie on 8/4/16.
//  Copyright © 2016 YekiSoft. All rights reserved.
//

#import <Foundation/Foundation.h>

#define DEFAULT_LANGUAGE @"English"
#define DEFAULT_THEME @"Default"

@interface Settings : NSObject

+ (void)setLanguageFileName: (NSString*)value;
+ (NSString*)getLanguageFileName;
+ (void)setThemeFileName: (NSString*)value;
+ (NSString*)getThemeFileName;

+ (void)setGooglePlusAccessToken: (NSString*)value;
+ (NSString*)getGooglePlusAccessToken;

+ (void)setUserFirstName: (NSString*)value;
+ (NSString*)getUserFirstName;
+ (void)setUserLastName: (NSString*)value;
+ (NSString*)getUserLastName;
+ (void)setUserMiddleName: (NSString*)value;
+ (NSString*)getUserMiddleName;
+ (void)setUserEmail: (NSString*)value;
+ (NSString*)getUserEmail;

@end
