//
//  SignInViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SignInViewController.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>

@interface SignInViewController ()

@end

@implementation SignInViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self loadTermOfUse];
}

- (void)loadTermOfUse {
    NSString* text = L(@"SignInPage/TermsOfUse");
    NSArray* parts = [text componentsSeparatedByString:@"<blue>"];
    NSInteger begin = [[parts objectAtIndex:0] length];
    NSInteger length = [[parts objectAtIndex:1] length];

    NSMutableString* content = [[NSMutableString alloc] init];
    for (int i = 0; i < parts.count; i++) {
        [content appendString:[parts objectAtIndex:i]];
    }

    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:content attributes:nil];
    NSRange linkRange = NSMakeRange(begin, length);

    NSDictionary *linkAttributes = @{ NSForegroundColorAttributeName : [UIColor colorWithRed:0.05 green:0.4 blue:0.65 alpha:1.0] };
    [attributedString setAttributes:linkAttributes range:linkRange];

    self.termOfUseLabel.attributedText = attributedString;
}

@end
