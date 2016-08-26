//
//  ConfirmTravelingViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/19/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "ConfirmTravelingViewController.h"
#import "AuthUtils.h"
#import "MKInputBoxView.h"
#import "GetUserInfoResult.h"

#define MARGIN 20

@implementation ConfirmTravelingViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self setupButtonView:self.confirmButton];
}

- (NSString*)getTitleString {
    return L(@"TripConfirmPage/Title");
}

- (void)showNormalMode {
    self.summaryLabel.hidden = NO;
    self.confirmButton.hidden = NO;
    self.waitAnimation.hidden = YES;
    [self.waitAnimation stopAnimating];
}

- (void)showWaitMode {
    self.summaryLabel.hidden = YES;
    self.confirmButton.hidden = YES;
    self.waitAnimation.hidden = NO;
    [self.waitAnimation startAnimating];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];

    [self showWaitMode];
    [[Server instance] getUserInfo:[AuthUtils instance].userEmail callback:^(int resultCode, NSObject *result) {
        [self finishGetInfoCall:(GetUserInfoResult*)result];
    }];
}

- (void)finishGetInfoCall:(GetUserInfoResult*)info {
    if ([info hasPhoneNumber]) {
        [self showNormalMode];
        self.phone = info.userPhone;

        [self initializeView];
    } else {
        MKInputBoxView *inputBoxView = [MKInputBoxView boxOfType:PhoneNumberInput];
        [inputBoxView setBlurEffectStyle:UIBlurEffectStyleDark];
        [inputBoxView setTitle:L(@"TripConfirmPage/PhoneTitle")];
        [inputBoxView setMessage:L(@"TripConfirmPage/PhoneMessage")];
        [inputBoxView setSubmitButtonText:L(@"OK")];
        [inputBoxView setCancelButtonText:L(@"Cancel")];

        [inputBoxView setOnSubmit:^(NSString *v1, NSString *v2) {
            if (v1.length < 10) {
                [self.navigationController popViewControllerAnimated:YES];
            } else {
                self.phone = v1;
                [[Server instance] updateUserPhone:[AuthUtils instance].userEmail toPhone:v1 callback:^(int resultCode, NSObject *result) {
                    [self showNormalMode];
                    [self initializeView];
                }];
            }
        }];

        [inputBoxView setOnCancel:^{
            [self.navigationController popViewControllerAnimated:YES];
        }];

        [inputBoxView show];
    }
}

- (void)initializeView {
    self.summaryLabel.contentInset = UIEdgeInsetsMake(0, 0, 0, 0);
    NSString* summary = L(@"TripConfirmPage/Summary");
    summary = [summary stringByReplacingOccurrencesOfString:@"\\r\\n" withString:@"\r\n"];

    summary = [summary stringByReplacingOccurrencesOfString:@"$from" withString:[self.citySource description]];
    summary = [summary stringByReplacingOccurrencesOfString:@"$destination" withString:[self.cityDestination description]];
    summary = [summary stringByReplacingOccurrencesOfString:@"$date" withString:[self getTripDate]];
    summary = [summary stringByReplacingOccurrencesOfString:@"$items" withString:[self getItems]];
    summary = [summary stringByReplacingOccurrencesOfString:@"$contact" withString:[self getContact]];

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

- (NSString*)getContact {
    return [NSString stringWithFormat:@"%@ [%@]", [AuthUtils instance].userEmail, self.phone];
}

- (NSString*)getItems {
    if (self.acceptDocument && self.acceptBox) {
        return L(@"TravelPage/BoxAndDocument");
    } else if (self.acceptBox) {
        return L(@"TravelPage/Box");
    }

    return L(@"TravelPage/Document");
}

- (NSString*)getTripDate {
    return [NSDateFormatter localizedStringFromDate:self.tripDate
                                          dateStyle:NSDateFormatterLongStyle
                                          timeStyle:NSDateFormatterNoStyle];
}

- (void)updateSummarySize {
    CGSize size = [self.summaryLabel sizeThatFits:CGSizeMake(CGRectGetWidth(self.view.frame) - 2 * MARGIN, 0)];
    self.layoutSummaryHeight.constant = size.height;

    [self.view setNeedsUpdateConstraints];
}

- (IBAction)onConfirm:(id)sender {
    
}

- (void)setupButtonView:(UIButton*)button {
    button.layer.cornerRadius = 7;
    button.layer.borderWidth = 1.0 / [[UIScreen mainScreen] scale];
    button.layer.borderColor = button.tintColor.CGColor;
}

@end
