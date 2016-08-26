//
//  ConfirmTravelingViewController.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/19/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "BaseViewController.h"
#import "Server.h"

@interface ConfirmTravelingViewController : BaseViewController

@property (strong, nonatomic) CityInfo *citySource;
@property (strong, nonatomic) CityInfo *cityDestination;
@property (strong, nonatomic) NSDate *tripDate;
@property (assign, nonatomic) BOOL acceptDocument;
@property (assign, nonatomic) BOOL acceptBox;
@property (strong, nonatomic) NSString* phone;
@property (weak, nonatomic) IBOutlet UIActivityIndicatorView *waitAnimation;

@property (weak, nonatomic) IBOutlet NSLayoutConstraint *layoutSummaryHeight;
@property (weak, nonatomic) IBOutlet UITextView *summaryLabel;
@property (weak, nonatomic) IBOutlet UIButton *confirmButton;

@end
