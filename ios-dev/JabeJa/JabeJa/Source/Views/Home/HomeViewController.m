//
//  HomeViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "HomeViewController.h"
#import "PresentViewSegue.h"
#import "AuthUtils.h"

#define SEGUE_SHOW_LOGIN @"s_ShowLogin"

@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self setupButtonView:self.cmdTraveling];
    [self setupButtonView:self.cmdSearchTravelers];
}

- (void)setupButtonView:(UIButton*)button {
    button.layer.cornerRadius = 7;
    button.layer.borderWidth = 1.0 / [[UIScreen mainScreen] scale];
    button.layer.borderColor = button.tintColor.CGColor;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    if (![[AuthUtils instance] isSignedIn]) {
        [self performSegueWithIdentifier:SEGUE_SHOW_LOGIN sender:self];
    }
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:SEGUE_SHOW_LOGIN]) {
        ((PresentViewSegue*)segue).showFormSheet = [Utils isTablet];
    }
}

- (NSString*)getTitleString {
    return L(@"HomePage/Title");
}

@end
