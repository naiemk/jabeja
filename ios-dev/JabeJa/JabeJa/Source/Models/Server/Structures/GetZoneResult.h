//
//  GetZoneResult.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GeneralResponse.h"
#import "CityInfo.h"

@interface GetZoneResult : GeneralResponse

@property (strong, nonatomic) NSArray* zones;

@end
