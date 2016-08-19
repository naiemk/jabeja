//
//  Server.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "Server.h"

@interface Server() {
    SERVER_CALLBACK _callback;
}

@end

@implementation Server

static Server* _instance;

+ (Server*)instance {
    if (_instance == nil) {
        _instance = [[Server alloc] init];
    }

    return _instance;
}

- (void)fetchListOfSupportedCities:(SERVER_CALLBACK)callback {
    _callback = callback;
    [self performSelectorInBackground:@selector(loadListOfCities) withObject:self];
}

- (void)login:(LoginParameter*)param callback:(SERVER_CALLBACK)callback {
    _callback = callback;
    [self performSelectorInBackground:@selector(doLogin) withObject:self];
}

- (void)doLogin {
    usleep(1000000);

    _callback(0, nil);
    _callback = nil;
}

- (void)loadListOfCities {
    usleep(1000000);

    NSMutableArray* list = [[NSMutableArray alloc] init];

    [list addObject:[self createCity:@"Seatle" persian:@"سیاتل" country:@"United States" persian:@"آمریکا"]];
    [list addObject:[self createCity:@"San Francisco" persian:@"سان فرانسیسکو" country:@"United States" persian:@"آمریکا"]];
    [list addObject:[self createCity:@"Tehran" persian:@"تهران" country:@"Iran" persian:@"ایران"]];

    _callback(0, list);
    _callback = nil;
}

- (CityInfo*)createCity:(NSString*)englishTitle persian:(NSString*)persianTitle country:(NSString*)englishCountry persian:(NSString*)persianCountry {
    CityInfo* result = [[CityInfo alloc] init];

    result.titleEnglish = englishTitle;
    result.titlePersian = persianTitle;
    result.countryPersian = persianCountry;
    result.countryEnglish = englishCountry;

    return result;
}

@end
