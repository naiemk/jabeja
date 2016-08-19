//
//  Server.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CityInfo.h"
#import "LoginParameter.h"

#define RESULT_SUCCESS 0

typedef void(^SERVER_CALLBACK)(int resultCode, NSObject* result);
#define IS_SERVER_CALL_SUCCESSFUL(resultCode) (resultCode == RESULT_SUCCESS)

@interface Server : NSObject

+ (Server*)instance;

- (void)login:(LoginParameter*)param callback:(SERVER_CALLBACK)callback;
- (void)fetchListOfSupportedCities:(SERVER_CALLBACK)callback;

@end
