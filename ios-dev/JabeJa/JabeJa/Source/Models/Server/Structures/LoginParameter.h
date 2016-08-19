//
//  LoginParameter.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LoginParameter : NSObject

@property (strong, nonatomic) NSString* facebookUserID;
@property (strong, nonatomic) NSString* userFirstName;
@property (strong, nonatomic) NSString* userLastName;
@property (strong, nonatomic) NSString* userMiddleName;
@property (strong, nonatomic) NSString* userEmail;
@property (strong, nonatomic) NSString* userPhone;

@end
