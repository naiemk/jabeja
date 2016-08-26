//
//  SelectTripLocationViewController.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "SelectTripLocationViewController.h"
#import "Server.h"
#import "GetZoneResult.h"

#define CELL_IDENTIFIER @"cell_tableview_list_of_cities"

@implementation SelectTripLocationViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.tableView.delegate = self;
    self.tableView.dataSource = self;

    [self.tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:CELL_IDENTIFIER];

    [self showWaitMode];
    [[Server instance] fetchListOfSupportedCities:^(int resultCode, NSObject *result) {
        [self onFetchListOfCitiesCompleted:resultCode withResult:((GetZoneResult*)result).zones];
    }];
}

- (void)onFetchListOfCitiesCompleted:(int)resultCode withResult:(NSArray*)result {
    [self showNormalMode];

    if (IS_SERVER_CALL_SUCCESSFUL(resultCode)) {
        self.listOfCities = result;
        [self.tableView reloadData];
    } else {
        [self.navigationController popViewControllerAnimated:YES];
    }
}

- (void)showNormalMode {
    [self.waitAnimation stopAnimating];
    self.waitAnimation.hidden = YES;
    self.lblPleaseWait.hidden = YES;

    self.tableView.hidden = NO;
}

- (void)showWaitMode {
    [self.waitAnimation startAnimating];
    self.waitAnimation.hidden = NO;
    self.lblPleaseWait.hidden = NO;

    self.tableView.hidden = YES;
}

- (NSString*)getTitleString {
    return L(@"TripLocationPage/Title");
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    CityInfo* info = [self.listOfCities objectAtIndex:indexPath.row];
    self.cityLoader(info);
    [self.navigationController popViewControllerAnimated:YES];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (self.listOfCities == nil) {
        return 0;
    }

    return self.listOfCities.count;
}

- (UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell* cell = nil; //[tableView dequeueReusableCellWithIdentifier:CELL_IDENTIFIER forIndexPath:indexPath];

    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CELL_IDENTIFIER];
    }

    CityInfo* info = [self.listOfCities objectAtIndex:indexPath.row];
    
    cell.textLabel.text = [info getCityName];
    cell.detailTextLabel.text = [info getCountryName];
    cell.detailTextLabel.textColor = [UIColor grayColor];

    cell.textLabel.textAlignment = [Utils getDefaultTextAlignment];
    cell.detailTextLabel.textAlignment = [Utils getDefaultTextAlignment];

    return cell;
}

@end
