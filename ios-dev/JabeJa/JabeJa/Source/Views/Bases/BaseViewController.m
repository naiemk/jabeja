//
//  BaseViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "BaseViewController.h"

@interface BaseViewController ()

@end

@implementation BaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];

    if (self.navigationItem.rightBarButtonItem != nil) {
        UIBarButtonItem* item = self.navigationItem.rightBarButtonItem;
        [item reload];
    }

    if (self.navigationItem.leftBarButtonItem != nil) {
        UIBarButtonItem* item = self.navigationItem.leftBarButtonItem;
        [item reload];
    }

    self.title = [self getTitleString];

    int fontSize = [L(@"NavigationControllerTitleFontSize") intValue];
    [self.navigationController.navigationBar setTitleTextAttributes:
     @{ NSFontAttributeName:[Utils createDefaultBoldFont:fontSize]}];
}

- (NSString*)getTitleString {
    return @"";
}

@end
