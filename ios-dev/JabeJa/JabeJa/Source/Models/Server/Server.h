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
#import "TravelConfirmationParameter.h"


#define RESULT_SUCCESS 0
#define RESULT_ERROR_INTERNAL -1
#define RESULT_ERROR_CANT_PARSE_RESULT -2

typedef void(^SERVER_CALLBACK)(int resultCode, NSObject* result);
#define IS_SERVER_CALL_SUCCESSFUL(resultCode) (resultCode == RESULT_SUCCESS)

@interface Server : NSObject

+ (Server*)instance;

- (void)login:(LoginParameter*)param callback:(SERVER_CALLBACK)callback;
- (void)getUserInfo:(NSString*)email callback:(SERVER_CALLBACK)callback;
- (void)confirmTrip:(TravelConfirmationParameter*)email callback:(SERVER_CALLBACK)callback;
- (void)fetchListOfSupportedCities:(SERVER_CALLBACK)callback;
- (void)updateUserPhone:(NSString*)email toPhone:(NSString*)phone callback:(SERVER_CALLBACK)callback;

@end


@protocol IResultLoader <NSObject>

- (void)load:(NSDictionary*)response;

@end