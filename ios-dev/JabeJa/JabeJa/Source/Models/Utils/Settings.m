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

+ (void)setUserFirstName: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"FIRST_NAME"];

    [defaults synchronize];
}

+ (NSString*)getUserFirstName {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"FIRST_NAME"];

    return result;
}

+ (void)setUserLastName: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"LAST_NAME"];

    [defaults synchronize];
}

+ (NSString*)getUserLastName {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"LAST_NAME"];

    return result;
}

+ (void)setUserMiddleName: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"MIDDLE_NAME"];

    [defaults synchronize];
}

+ (NSString*)getUserMiddleName {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"MIDDLE_NAME"];

    return result;
}

+ (void)setUserEmail: (NSString*)value {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:value forKey:@"EMAIL"];

    [defaults synchronize];
}

+ (NSString*)getUserEmail {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    NSString* result = (NSString*)[defaults objectForKey:@"EMAIL"];

    return result;
}

@end
