//
//  TripCell.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/26/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "BaseCell.h"
#import "SearchTripResponse.h"

@interface TripCell : BaseCell

@property (strong, nonatomic) TravelInfo* model;

@end
