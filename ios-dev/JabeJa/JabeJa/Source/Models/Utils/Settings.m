//
//  Settings.m
//  MuslimLib
//
//  Created by Mohammad Ali Yektaie on 8/4/16.
//  Copyright © 2016 YekiSoft. All rights reserved.
//

#import "Settings.h"

@implementation Settings

+ (void)setLanguageFileName: (NSString*)value
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"LANGUAGE_FILE_NAME"];

    [defaults synchronize];
}

+ (NSString*)getLanguageFileName
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"LANGUAGE_FILE_NAME"];

    if (result == nil) {
        return DEFAULT_LANGUAGE;
    }

    return result;
}

+ (void)setThemeFileName: (NSString*)value
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"THEME_FILE_NAME"];

    [defaults synchronize];
}

+ (NSString*)getThemeFileName
{
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"THEME_FILE_NAME"];

    if (result == nil) {
        result = DEFAULT_THEME;
    }

    return result;
}

+ (void)setFacebookAccessToken: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"FACEBOOK_AUTH_ACCESS_TOKEN"];

    [defaults synchronize];
}

+ (NSString*)getFacebookAccessToken {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"FACEBOOK_AUTH_ACCESS_TOKEN"];

    return result;
}

+ (void)setGooglePlusAccessToken: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"GOOGLE_PLUS_AUTH_ACCESS_TOKEN"];

    [defaults synchronize];
}

+ (NSString*)getGooglePlusAccessToken {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"GOOGLE_PLUS_AUTH_ACCESS_TOKEN"];

    return result;
}


@end
