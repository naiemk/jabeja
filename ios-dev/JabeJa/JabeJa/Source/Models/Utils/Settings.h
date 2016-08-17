//
//  Settings.h
//  MuslimLib
//
//  Created by Mohammad Ali Yektaie on 8/4/16.
//  Copyright © 2016 YekiSoft. All rights reserved.
//

#import <Foundation/Foundation.h>

#define DEFAULT_LANGUAGE @"English"
#define DEFAULT_THEME @"Green"

@interface Settings : NSObject

+ (void)setLanguageFileName: (NSString*)value;
+ (NSString*)getLanguageFileName;
+ (void)setThemeFileName: (NSString*)value;
+ (NSString*)getThemeFileName;

+ (void)setFacebookAccessToken: (NSString*)value;
+ (NSString*)getFacebookAccessToken;
+ (void)setGooglePlusAccessToken: (NSString*)value;
+ (NSString*)getGooglePlusAccessToken;

@end
