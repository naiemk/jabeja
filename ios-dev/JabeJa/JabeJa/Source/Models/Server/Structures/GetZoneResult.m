//
//  GetZoneResult.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GetZoneResult.h"

@implementation GetZoneResult

- (void)load:(NSDictionary*)responseJson {
    [super load:responseJson];
    NSArray* list = (NSArray*)responseJson;
    NSMutableArray* result = [[NSMutableArray alloc] init];

    for (int i = 0; i < list.count; i++) {
        CityInfo* zone = [[CityInfo alloc] init];
        NSDictionary* response = [list objectAtIndex:i];

        zone.identifier = STRING(@"zoneId");
        zone.titleEnglish = STRING(@"title_en");
        zone.titlePersian = STRING(@"title_fa");
        zone.countryEnglish = STRING(@"country_en");
        zone.countryPersian = STRING(@"country_fa");

        [result addObject:zone];
    }

    self.zones = result;
}

@end
