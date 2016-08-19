//
//  HomeViewController.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CityInfo.h"

@interface HomeViewController : BaseViewController <UITextFieldDelegate>

@property (weak, nonatomic) IBOutlet UIButton *cmdTraveling;
@property (weak, nonatomic) IBOutlet UIButton *cmdSearchTravelers;
@property (weak, nonatomic) IBOutlet UITextField *txtFrom;
@property (weak, nonatomic) IBOutlet UITextField *txtTo;
@property (weak, nonatomic) IBOutlet UIDatePicker *tripDate;
@property (weak, nonatomic) IBOutlet UIActivityIndicatorView *waitAnimation;
@property (weak, nonatomic) IBOutlet UILabel *lblFrom;
@property (weak, nonatomic) IBOutlet UILabel *lblTo;
@property (weak, nonatomic) IBOutlet UILabel *lblTripDate;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *cmdSettings;
@property (weak, nonatomic) IBOutlet UIView *packageTypeContainer;

@property (strong, nonatomic) CityInfo *citySource;
@property (strong, nonatomic) CityInfo *cityDestination;

@end
