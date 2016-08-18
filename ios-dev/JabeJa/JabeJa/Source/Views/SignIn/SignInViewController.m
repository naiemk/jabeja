//
//  SignInViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SignInViewController.h"

@interface SignInViewController ()

@end

@implementation SignInViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self loadTermOfUse];
    [self setupFacebookLoginButton];

    [self showNormalMode];
}

- (void)setupFacebookLoginButton {
    self.facebookLoginButton.readPermissions = FACEBOOK_REQUIRED_PERMISSIONS;
    self.facebookLoginButton.delegate = self;
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

- (void)showNormalMode {
    self.waitAnimation.hidden = YES;
    [self.waitAnimation stopAnimating];

    self.facebookLoginButton.hidden = NO;
    self.termOfUseLabel.hidden = NO;
}

- (void)showWaitMode {
    self.waitAnimation.hidden = NO;
    [self.waitAnimation startAnimating];

    self.facebookLoginButton.hidden = YES;
    self.termOfUseLabel.hidden = YES;
}

#pragma mark - Facebook Delegate

- (void)  loginButton:(FBSDKLoginButton *)loginButton didCompleteWithResult:(FBSDKLoginManagerLoginResult *)result error:(NSError *)error {
    if (!result.isCancelled && [AuthUtils hasRequiredPermissionsFromFacebook:result] && error == nil) {
        [self registerUserWithFacebookInfo:result];
    } else {
        [self displayErrorInFacebookLogin];
        [[FBSDKLoginManager new] logOut];
    }

}

- (void)loginButtonDidLogOut:(FBSDKLoginButton *)loginButton {

}

#pragma mark - Facebook Login Util Methods

- (void)displayErrorInFacebookLogin {

}

- (void)registerUserWithFacebookInfo:(FBSDKLoginManagerLoginResult*)fbResult {
    [self showWaitMode];
    [[AuthUtils instance] fetchUserInformations:AuthTypeFacebook withCallback:^(BOOL result) {
        if (result) {
            [self sendFacebookRegistrationRequestToServer:fbResult.token.userID];
        } else {
            [self showNormalMode];

            [self displayErrorInFacebookLogin];
            [[FBSDKLoginManager new] logOut];
        }
    }];
}

- (void)sendFacebookRegistrationRequestToServer:(NSString*)userId {
    [self dismissViewControllerAnimated:YES completion:nil];
}


@end
