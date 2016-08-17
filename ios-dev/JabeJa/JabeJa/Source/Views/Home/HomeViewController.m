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

    if (![[AuthUtils instance] isSignedIn]) {
        [self performSegueWithIdentifier:SEGUE_SHOW_LOGIN sender:self];
    }
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:SEGUE_SHOW_LOGIN]) {
        ((PresentViewSegue*)segue).showFormSheet = [Utils isTablet];
    }
}

@end
