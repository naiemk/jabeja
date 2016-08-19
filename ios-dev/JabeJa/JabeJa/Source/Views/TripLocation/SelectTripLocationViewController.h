//
//  SelectTripLocationViewController.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "BaseViewController.h"
#import "CityInfo.h"

typedef void(^LoadCityInfo)(CityInfo* info);

@interface SelectTripLocationViewController : BaseViewController <UITableViewDataSource, UITableViewDelegate>

@property (assign, nonatomic) BOOL shouldUseCurrentLocation;
@property (strong, nonatomic) NSArray* listOfCities;
@property (strong, nonatomic) LoadCityInfo cityLoader;

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet UIActivityIndicatorView *waitAnimation;
@property (weak, nonatomic) IBOutlet UILabel *lblPleaseWait;

@end
