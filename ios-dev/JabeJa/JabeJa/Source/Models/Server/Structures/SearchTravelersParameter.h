//
//  SearchTravelersParameter.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SearchTravelersParameter : NSObject

@property (assign, nonatomic) BOOL hasBox;
@property (assign, nonatomic) BOOL hasDocument;
@property (strong, nonatomic) NSString* source;
@property (strong, nonatomic) NSString* destination;
@property (strong, nonatomic) NSDate* travelDate;

- (NSDictionary*)toDictionary;
- (NSString*)getDeliveryType;
- (NSString*)getDate;


@end
