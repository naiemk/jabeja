//
//  CityInfo.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CityInfo : NSObject

@property (strong, nonatomic) NSString* titleEnglish;
@property (strong, nonatomic) NSString* titlePersian;
@property (strong, nonatomic) NSString* countryEnglish;
@property (strong, nonatomic) NSString* countryPersian;
@property (strong, nonatomic) NSString* identifier;

- (NSString*)getCityName;
- (NSString*)getCountryName;

@end
