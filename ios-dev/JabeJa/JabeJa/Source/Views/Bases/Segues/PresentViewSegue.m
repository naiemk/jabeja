//
//  PresentViewSegue.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "PresentViewSegue.h"

@implementation PresentViewSegue

- (void)perform {
    UINavigationController* navController = [[UINavigationController alloc] initWithRootViewController:self.destinationViewController];

    if (self.showFormSheet) {
        navController.modalPresentationStyle = UIModalPresentationFormSheet;
    }

    [self.sourceViewController presentViewController:navController animated:YES completion:nil];
}

@end
