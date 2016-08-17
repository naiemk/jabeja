//
//  SignInViewController.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "BaseViewController.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>


@interface SignInViewController : BaseViewController

@property (weak, nonatomic) IBOutlet UILabel *termOfUseLabel;
@property (weak, nonatomic) IBOutlet FBSDKLoginButton *facebookLoginButton;

@end
