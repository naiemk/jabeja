//
//  SearchTravelersViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SearchTravelersViewController.h"
#import "Server.h"
#import "SearchTripResponse.h"
#import "TripCell.h"

#define CELL_IDENTIFIER @"cell_search_trip"

@implementation SearchTravelersViewController

- (NSString*)getTitleString {
    return L(@"SearchTravelersPage/Title");
}

- (void)viewDidLoad {
    [super viewDidLoad];

    [self.tableView registerClass:[TripCell class] forCellReuseIdentifier:CELL_IDENTIFIER];

    self.tableView.delegate = self;
    self.tableView.dataSource = self;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];

    [self showWaitMode];
    SearchTravelersParameter* param = [[SearchTravelersParameter alloc] init];
    param.hasBox = self.acceptBox;
    param.hasDocument = self.acceptDocument;
    param.source = self.citySource.identifier;
    param.destination = self.cityDestination.identifier;
    param.travelDate = self.tripDate;

    [[Server instance] searchTrip:param callback:^(int resultCode, NSObject *result) {
        self.trips = ((SearchTripResponse*)result).trips;

        [self.tableView reloadData];
        [self showNormalMode];
    }];
}

- (void)showWaitMode {
    [self.waitAnimation startAnimating];
    self.waitAnimation.hidden = NO;

    self.tableView.hidden = YES;
}

- (void)showNormalMode {
    [self.waitAnimation stopAnimating];
    self.waitAnimation.hidden = YES;

    self.tableView.hidden = NO;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.trips == nil) {
        return 0;
    }

    return self.trips.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    TripCell* cell = (TripCell*)[tableView dequeueReusableCellWithIdentifier:CELL_IDENTIFIER forIndexPath:indexPath];

    if (cell == nil) {
        cell = [[TripCell alloc] initWithReuseIdentifier:CELL_IDENTIFIER];
    }

    cell.model = [self.trips objectAtIndex:indexPath.row];

    return cell;
}


@end
