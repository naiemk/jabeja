//
//  ConfirmTravelingViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/19/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "ConfirmTravelingViewController.h"

#define MARGIN 20

@implementation ConfirmTravelingViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}

- (NSString*)getTitleString {
    return L(@"TripConfirmPage/Title");
}

- (void)viewWillAppear:(BOOL)animated {
    NSString* summary = L(@"TripConfirmPage/Summary");
    summary = [summary stringByReplacingOccurrencesOfString:@"\\r\\n" withString:@"\r\n"];

    NSArray* parts = [summary componentsSeparatedByString:@"<blue>"];

    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:@"" attributes:nil];
    for (int i = 0; i < parts.count; i++) {
        NSString* p = [parts objectAtIndex:i];
        NSMutableAttributedString* temp = [[NSMutableAttributedString alloc] initWithString:p attributes:nil];

        [attributedString appendAttributedString:temp];
    }

    int lengthBefore = 0;
    for (int i = 0; i < parts.count; i++) {
        NSString* p = [parts objectAtIndex:i];

        if ((i % 2) == 1) {
            NSRange linkRange = NSMakeRange(lengthBefore, p.length);
            [attributedString addAttribute:NSForegroundColorAttributeName value:[UIColor colorWithRed:0.05 green:0.4 blue:0.65 alpha:1.0] range:linkRange];
        }

        lengthBefore += (int)p.length;
    }

    NSRange linkRange = NSMakeRange(0, attributedString.length);
    [attributedString addAttribute:NSFontAttributeName value:[Utils createDefaultFont:14] range:linkRange];


    self.summaryLabel.attributedText = attributedString;
    [self updateSummarySize];
}

- (void)updateSummarySize {
    CGSize size = [self.summaryLabel sizeThatFits:CGSizeMake(CGRectGetWidth(self.view.frame) - 2 * MARGIN, 0)];
    self.layoutSummaryHeight.constant = size.height;

    [self.view setNeedsUpdateConstraints];
}

@end
