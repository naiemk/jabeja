//
//  SearchTripResponse.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GeneralResponse.h"

@interface TravelInfo : NSObject

@property (strong, nonatomic) NSString* userFacebookID;
@property (strong, nonatomic) NSString* userName;
@property (strong, nonatomic) NSString* userPhone;
@property (strong, nonatomic) NSString* userEmail;
@property (assign, nonatomic) BOOL hasBox;
@property (assign, nonatomic) BOOL hasDocument;
@property (strong, nonatomic) NSString* source;
@property (strong, nonatomic) NSString* destination;
@property (strong, nonatomic) NSDate* travelDate;
@property (assign, nonatomic) int serviceCharge;

@end

@interface SearchTripResponse : GeneralResponse

@property (strong, nonatomic) NSArray* trips;

@end
