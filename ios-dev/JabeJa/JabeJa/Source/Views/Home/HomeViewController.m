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
#import "SelectTripLocationViewController.h"
#import "ConfirmTravelingViewController.h"
#import "SearchTravelersViewController.h"

#define SEGUE_SHOW_LOGIN @"s_ShowLogin"
#define SEGUE_SHOW_DESTINATION_TRIP @"s_ShowDestinationTrip"
#define SEGUE_SHOW_SOURCE_TRIP @"s_ShowSourceTrip"
#define SEGUE_SHOW_CONFIRM_TRAVELING @"s_ShowConfirmTraveling"
#define SEGUE_SHOW_TRAVELERS @"s_ShowTravelers"

@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    [self setupButtonView:self.cmdTraveling];
    [self setupButtonView:self.cmdSearchTravelers];

    [self setupTripPoint:self.txtTo];
    [self setupTripPoint:self.txtFrom];

    [self setButtonsEnablity];
    [self showNormalMode];
}

- (void)showWaitMode {
    [self.waitAnimation startAnimating];
    self.waitAnimation.hidden = NO;

    self.txtFrom.hidden = YES;
    self.txtTo.hidden = YES;
    self.lblFrom.hidden = YES;
    self.lblTo.hidden = YES;
    self.lblTripDate.hidden = YES;
    self.tripDate.hidden = YES;
    self.cmdTraveling.hidden = YES;
    self.cmdSearchTravelers.hidden = YES;
    self.cmdSettings.enabled = NO;
    self.packageTypeContainer.hidden = YES;
}

- (void)showNormalMode {
    [self.waitAnimation stopAnimating];
    self.waitAnimation.hidden = YES;

    self.txtFrom.hidden = NO;
    self.txtTo.hidden = NO;
    self.lblFrom.hidden = NO;
    self.lblTo.hidden = NO;
    self.lblTripDate.hidden = NO;
    self.tripDate.hidden = NO;
    self.cmdTraveling.hidden = NO;
    self.cmdSearchTravelers.hidden = NO;
    self.cmdSettings.enabled = YES;
    self.packageTypeContainer.hidden = NO;
}

- (void)setupTripPoint:(UITextField*)textField {
    textField.delegate = self;
    textField.userInteractionEnabled = YES;
}

- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField {
    if (textField == self.txtFrom) {
        [self performSegueWithIdentifier:SEGUE_SHOW_SOURCE_TRIP sender:self];
    } else if (textField == self.txtTo) {
        [self performSegueWithIdentifier:SEGUE_SHOW_DESTINATION_TRIP sender:self];
    }

    return NO;
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

    if (self.cityDestination != nil) {
        self.txtTo.text = [self.cityDestination getCityName];
    }

    if (self.citySource != nil) {
        self.txtFrom.text = [self.citySource getCityName];
    }
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if ([segue.identifier isEqualToString:SEGUE_SHOW_LOGIN]) {
        ((PresentViewSegue*)segue).showFormSheet = [Utils isTablet];
    } else if ([segue.identifier isEqualToString:SEGUE_SHOW_SOURCE_TRIP]) {
        SelectTripLocationViewController* dest = (SelectTripLocationViewController*)segue.destinationViewController;
        dest.shouldUseCurrentLocation = YES;
        dest.cityLoader = ^(CityInfo* info) {
            self.citySource = info;
            self.txtFrom.text = [info getCityName];

            [self setButtonsEnablity];
        };
    } else if ([segue.identifier isEqualToString:SEGUE_SHOW_DESTINATION_TRIP]) {
        SelectTripLocationViewController* dest = (SelectTripLocationViewController*)segue.destinationViewController;
        dest.shouldUseCurrentLocation = NO;
        dest.cityLoader = ^(CityInfo* info) {
            self.cityDestination = info;
            self.txtTo.text = [info getCityName];

            [self setButtonsEnablity];
        };
    } else if ([segue.identifier isEqualToString:SEGUE_SHOW_CONFIRM_TRAVELING]) {
        ConfirmTravelingViewController* controller = (ConfirmTravelingViewController*)segue.destinationViewController;

        controller.citySource = self.citySource;
        controller.cityDestination = self.cityDestination;
        controller.tripDate = self.tripDate.date;
        controller.acceptBox = self.swBox.on;
        controller.acceptDocument = self.swDocument.on;
    } else if ([segue.identifier isEqualToString:SEGUE_SHOW_TRAVELERS]) {
        SearchTravelersViewController* controller = (SearchTravelersViewController*)segue.destinationViewController;

        controller.citySource = self.citySource;
        controller.cityDestination = self.cityDestination;
        controller.tripDate = self.tripDate.date;
        controller.acceptBox = self.swBox.on;
        controller.acceptDocument = self.swDocument.on;
    }
}

- (IBAction)onDocumentOptionChanged:(id)sender {
    [self setButtonsEnablity];
}

- (IBAction)onBoxOptionChanged:(id)sender {
    [self setButtonsEnablity];
}

- (void)setButtonsEnablity {
    BOOL enable = self.citySource != nil && self.cityDestination != nil
                    && (self.swDocument.on || self.swBox.on);

    self.cmdTraveling.enabled = enable;
    self.cmdSearchTravelers.enabled = enable;

    if (enable) {
        self.cmdTraveling.layer.borderColor = self.cmdTraveling.tintColor.CGColor;
        self.cmdSearchTravelers.layer.borderColor = self.cmdTraveling.tintColor.CGColor;
    } else {
        self.cmdTraveling.layer.borderColor = [UIColor lightGrayColor].CGColor;
        self.cmdSearchTravelers.layer.borderColor = [UIColor lightGrayColor].CGColor;
    }
}

- (NSString*)getTitleString {
    return L(@"HomePage/Title");
}

@end
