//
//  GetUserInfoResult.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/25/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GeneralResponse.h"

@interface GetUserInfoResult : GeneralResponse

@property (strong, nonatomic) NSString* userEmail;
@property (strong, nonatomic) NSString* userFirstName;
@property (strong, nonatomic) NSString* userLastName;
@property (strong, nonatomic) NSString* userMiddleName;
@property (strong, nonatomic) NSString* userPhone;

- (BOOL)hasPhoneNumber;

@end
