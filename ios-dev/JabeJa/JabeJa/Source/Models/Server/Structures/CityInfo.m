//
//  CityInfo.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "CityInfo.h"

@implementation CityInfo

- (NSString*)getCityName {
    if ([[LanguageStrings instance].name isEqualToString:@"Persian"]) {
        return self.titlePersian;
    }

    return self.titleEnglish;
}

- (NSString*)getCountryName {
    if ([[LanguageStrings instance].name isEqualToString:@"Persian"]) {
        return self.countryPersian;
    }

    return self.countryEnglish;
}

@end
