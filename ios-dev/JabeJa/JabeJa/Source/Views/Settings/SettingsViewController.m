//
//  SettingsViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SettingsViewController.h"
#import "AuthUtils.h"

@implementation SettingsViewController

- (NSString*)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    NSString* result = @"";

    if (section == 0) {
        result = L(@"Settings/MyAccount");
    } else {
        result = L(@"Settings/Language");
    }

    return result;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    if (indexPath.section == 0) {
        [self signOut];
    } else if (indexPath.section == 1) {
        if (indexPath.row == 0) {
            // English
            [Settings setLanguageFileName:@"English"];
            [LanguageStrings invalidate];
        } else if (indexPath.row == 1) {
            // Persian
            [Settings setLanguageFileName:@"Persian"];
            [LanguageStrings invalidate];
        }

        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)signOut {
    [[AuthUtils instance] signOut];

    [self.navigationController popViewControllerAnimated:YES];
}

@end
