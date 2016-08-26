//
//  Server.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "Server.h"
#import "GeneralResponse.h"
#import "GetZoneResult.h"
#import "AFNetworking.h"
#import "GetUserInfoResult.h"
#import "SearchTripResponse.h"

#define METHOD_GET @"GET"
#define METHOD_POST @"POST"
#define METHOD_PUT @"PUT"

#define SERVER_PATH @"http://localhost:3000"

#define API_PATH_LOGIN                  @"/jabeja/api/user"
#define API_PATH_GET_ZONES              @"/jabeja/api/zone"
#define API_PATH_GET_USER_INFO          @"/jabeja/api/user/$email"
#define API_PATH_UPDATE_USER_INFO       @"/jabeja/api/user/$email"
#define API_PATH_CONFIRM_TRIP           @"/jabeja/api/trip"
#define API_PATH_SEARCH_TRIP            @"/jabeja/api/trip/type/:type/source/:srouce/dest/:dest/date/:date"

#define API_PATH(x) [NSString stringWithFormat:@"%@%@", SERVER_PATH, x]

@interface Server() {

}

@end

@implementation Server

static Server* _instance;

+ (Server*)instance {
    if (_instance == nil) {
        _instance = [[Server alloc] init];
    }

    return _instance;
}

- (void)fetchListOfSupportedCities:(SERVER_CALLBACK)callback {
    [self callServerAPI:API_PATH_GET_ZONES request:nil resultLoader:[[GetZoneResult alloc] init] callback:callback method:METHOD_GET];
}

- (void)login:(LoginParameter*)param callback:(SERVER_CALLBACK)callback {
    [self callServerAPI:API_PATH_LOGIN request:[param toDictionary] resultLoader:[[GeneralResponse alloc] init] callback:callback method:METHOD_POST];
}

- (void)getUserInfo:(NSString*)email callback:(SERVER_CALLBACK)callback {
    NSString* path = API_PATH_GET_USER_INFO;
    path = [path stringByReplacingOccurrencesOfString:@"$email" withString:email];

    [self callServerAPI:path request:nil resultLoader:[[GetUserInfoResult alloc] init] callback:callback method:METHOD_GET];
}

- (void)confirmTrip:(TravelConfirmationParameter*)param callback:(SERVER_CALLBACK)callback {
    [self callServerAPI:API_PATH_CONFIRM_TRIP request:[param toDictionary] resultLoader:[[GeneralResponse alloc] init] callback:callback method:METHOD_POST];
}

- (void)searchTrip:(SearchTravelersParameter*)param callback:(SERVER_CALLBACK)callback {
    NSString* path = API_PATH_SEARCH_TRIP;
    path = [path stringByReplacingOccurrencesOfString:@":type" withString:[param getDeliveryType]];
    path = [path stringByReplacingOccurrencesOfString:@":source" withString:param.source];
    path = [path stringByReplacingOccurrencesOfString:@":dest" withString:param.destination];
    path = [path stringByReplacingOccurrencesOfString:@":date" withString:[param getDate]];

    [self callServerAPI:path request:nil resultLoader:[[SearchTripResponse alloc] init] callback:callback method:METHOD_GET];
}

- (void)updateUserPhone:(NSString*)email toPhone:(NSString*)phone callback:(SERVER_CALLBACK)callback {
    NSString* path = API_PATH_UPDATE_USER_INFO;
    path = [path stringByReplacingOccurrencesOfString:@"$email" withString:email];

    NSDictionary* dictionary = @{
                                 @"email" : email,
                                 @"phone" : phone
                                 };

    [self callServerAPI:path request:dictionary resultLoader:[[GeneralResponse alloc] init] callback:callback method:METHOD_PUT];
}

#pragma mark - Common functions

- (NSString*)toJSON:(NSDictionary*)dic {
    if (dic == nil) {
        return @"";
    }

    NSError* error;
    NSString* result = nil;
    NSData* json = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];

    if (json != nil && error == nil)
    {
        result = [[NSString alloc] initWithData:json encoding:NSUTF8StringEncoding];
        result = [result stringByReplacingOccurrencesOfString:@"\n" withString:@" "];
    }

    return result;
}

- (NSData *)httpBodyForParamsDictionary:(NSDictionary *)paramDictionary
{
    NSMutableArray *parameterArray = [NSMutableArray array];

    [paramDictionary enumerateKeysAndObjectsUsingBlock:^(NSString *key, NSString *obj, BOOL *stop) {
        NSString *param = [NSString stringWithFormat:@"%@=%@", key, [self percentEscapeString:obj]];
        [parameterArray addObject:param];
    }];

    NSString *string = [parameterArray componentsJoinedByString:@"&"];

    return [string dataUsingEncoding:NSUTF8StringEncoding];
}

- (NSString *)percentEscapeString:(NSString *)string
{
    NSString *result = CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(kCFAllocatorDefault,
                                                                                 (CFStringRef)string,
                                                                                 (CFStringRef)@" ",
                                                                                 (CFStringRef)@":/?@!$&'()*+,;=",
                                                                                 kCFStringEncodingUTF8));
    return [result stringByReplacingOccurrencesOfString:@" " withString:@"+"];
}

- (void)callServerAPI:(NSString*)path request:(NSDictionary*)requestContent resultLoader:(id<IResultLoader>)loader callback:(SERVER_CALLBACK)callback method:(NSString*)method {
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;

    NSString* jsonRequest = [self toJSON:requestContent];
    NSString* url = API_PATH(path);
    NSLog(@"-----------------------------------------------------");
    NSLog(@"JSON: %@", jsonRequest);
    NSLog(@"-----------------------------------------------------");

    NSURL *URL = [NSURL URLWithString:url];
    NSMutableURLRequest *request = [[NSURLRequest requestWithURL:URL] mutableCopy];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPMethod:method];
    [request setHTTPBody:[jsonRequest dataUsingEncoding:NSUTF8StringEncoding]];

    AFHTTPRequestOperation *op = [[AFHTTPRequestOperation alloc] initWithRequest:request];
    [op setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        [self finishJsonRequest:responseObject withLoader:loader withCallback:callback withRequest:requestContent withAPIPath:path];
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        callback(RESULT_ERROR_INTERNAL, nil);
    }];
    [op start];

}

- (void) finishJsonRequest: (NSData*)json withLoader:(id<IResultLoader>)loader withCallback:(SERVER_CALLBACK)callback withRequest:(NSDictionary*)requestBody withAPIPath:(NSString*)path {
    GeneralResponse* resultObject = nil;

    resultObject = [self loadFromJSON:json withLoader:loader];

    if (resultObject == nil) {
        callback(RESULT_ERROR_CANT_PARSE_RESULT, nil);
    } else if ([resultObject requireLogin]) {
        NSLog(@"LOGIN REQUIRED");
//        [YekisoftServer showLoginWindowWithSuccessCallback: ^{
//            [self callJSONService:requestBody withType:type withLoader:loader withCallback:callback];
//        } onFailure:^{
//            callback(ERROR_LOGIN_CANCELED, nil, nil);
//        }];
    } else {
        callback([resultObject getErrorCode], resultObject);
    }

}

- (GeneralResponse*)loadFromJSON:(NSData*)json withLoader:(id<IResultLoader>)loader {
    NSError *error = nil;
    id object = [NSJSONSerialization
                 JSONObjectWithData:json
                 options:0
                 error:&error];

    if (error) {
        return nil;
    }

    NSDictionary *results = object;
    [loader load:results];

    return (GeneralResponse*)loader;
}


@end
