//
//  TravelConfirmationParameter.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TravelConfirmationParameter : NSObject

@property (strong, nonatomic) NSString* userPhone;
@property (assign, nonatomic) BOOL hasBox;
@property (assign, nonatomic) BOOL hasDocument;
@property (strong, nonatomic) NSString* source;
@property (strong, nonatomic) NSString* destination;
@property (strong, nonatomic) NSDate* travelDate;
@property (assign, nonatomic) int serviceCharge;

- (NSDictionary*)toDictionary;

@end
