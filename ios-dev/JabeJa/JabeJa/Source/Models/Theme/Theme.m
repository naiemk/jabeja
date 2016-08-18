//
//  Theme.m
//  MuslimLib
//
//  Created by Mohammad Ali Yektaie on 8/5/16.
//  Copyright © 2016 YekiSoft. All rights reserved.
//

#import "Theme.h"
#import "Utils.h"
#import "Settings.h"
#import "NSString+Contains.h"

@implementation Theme

@synthesize navigationBarTintColor = _navigationBarTintColor;

static Theme* _sharedInstance = nil;

+ (Theme*) instance {
    if (_sharedInstance == nil) {
        _sharedInstance = [[Theme alloc] init];
    }

    return _sharedInstance;
}

- (instancetype) init {
    self = [super init];

    if (self) {
        NSString* path = [Settings getThemeFileName];
        NSArray* lines = [Utils readTextFileLinesFromResource:path];

        _navigationBarTintColor = [self getColor:lines name: @"NavigationBarTintColor"];
    }

    return self;
}

- (UIColor*)getColor:(NSArray*)lines name:(NSString*)name {
    UIColor* result = [UIColor redColor];

    for (int i = 0; i < lines.count; i++) {
        NSString* line = [lines objectAtIndex:i];
        if ([line contains:name]) {
            NSString* value = [self getString:line];
            if ([value contains:@","]) {
                value = [value stringByReplacingOccurrencesOfString:@" " withString:@""];
                NSArray* parts = [value componentsSeparatedByString:@","];

                int red = [((NSString*)[parts objectAtIndex:0]) intValue];
                int green = [((NSString*)[parts objectAtIndex:1]) intValue];
                int blue = [((NSString*)[parts objectAtIndex:2]) intValue];

                result = [Utils colorFromRed:red Green:green Blue:blue];
            } else {
                unsigned hex = 0;
                NSScanner *scanner = [NSScanner scannerWithString:value];

                [scanner setScanLocation:0];
                [scanner scanHexInt:&hex];

                int top = (int)hex;

                int red = (top & 0x00ff0000) >> 16;
                int green = (top & 0x0000ff00) >> 8;
                int blue = (top & 0x000000ff);

                result = [Utils colorFromRed:red Green:green Blue:blue];
            }

            break;
        }
    }


    return result;
}

-(NSString*) getString:(NSString*)line {
    NSRange index = [line rangeOfString:@":"];

    return [line substringFromIndex:(index.location + 1)];
}


- (void)invalidate {
    _sharedInstance = nil;
}

@end
