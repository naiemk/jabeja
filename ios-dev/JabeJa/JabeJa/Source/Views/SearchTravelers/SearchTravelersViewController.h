//
//  SearchTravelersViewController.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "BaseViewController.h"
#import "CityInfo.h"

@interface SearchTravelersViewController : BaseViewController <UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) CityInfo *citySource;
@property (strong, nonatomic) UIAlertController *messageBox;
@property (strong, nonatomic) CityInfo *cityDestination;
@property (strong, nonatomic) NSDate *tripDate;
@property (assign, nonatomic) BOOL acceptDocument;
@property (assign, nonatomic) BOOL acceptBox;
@property (strong, nonatomic) NSArray *trips;

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UIActivityIndicatorView *waitAnimation;

@end
