//
//  Server.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "Server.h"
#import "GeneralResponse.h"
#import "AFNetworking.h"

#define SERVER_PATH @"http://localhost:3000"

#define API_PATH_LOGIN @"/jabeja/api/user"

#define API_PATH(x) [NSString stringWithFormat:@"%@%@", SERVER_PATH, x]

@interface Server() {
    SERVER_CALLBACK _callback;
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
    _callback = callback;
    [self performSelectorInBackground:@selector(loadListOfCities) withObject:self];
}

- (void)login:(LoginParameter*)param callback:(SERVER_CALLBACK)callback {
    [self callServerAPI:API_PATH_LOGIN request:[param toDictionary] resultLoader:[[GeneralResponse alloc] init] callback:callback];
}

- (void)doLogin {
    usleep(1000000);

    _callback(0, nil);
    _callback = nil;
}

- (void)loadListOfCities {
    usleep(1000000);

    NSMutableArray* list = [[NSMutableArray alloc] init];

    [list addObject:[self createCity:@"Seatle" persian:@"سیاتل" country:@"United States" persian:@"آمریکا"]];
    [list addObject:[self createCity:@"San Francisco" persian:@"سان فرانسیسکو" country:@"United States" persian:@"آمریکا"]];
    [list addObject:[self createCity:@"Tehran" persian:@"تهران" country:@"Iran" persian:@"ایران"]];

    _callback(0, list);
    _callback = nil;
}

- (CityInfo*)createCity:(NSString*)englishTitle persian:(NSString*)persianTitle country:(NSString*)englishCountry persian:(NSString*)persianCountry {
    CityInfo* result = [[CityInfo alloc] init];

    result.titleEnglish = englishTitle;
    result.titlePersian = persianTitle;
    result.countryPersian = persianCountry;
    result.countryEnglish = englishCountry;

    return result;
}

#pragma mark - Common functions

- (NSString*)toJSON:(NSDictionary*)dic {
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

- (void)callServerAPI:(NSString*)path request:(NSDictionary*)requestContent resultLoader:(id<IResultLoader>)loader callback:(SERVER_CALLBACK)callback {
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;

    NSString* jsonRequest = [self toJSON:requestContent];
    NSString* url = API_PATH(path);
    NSLog(@"-----------------------------------------------------");
    NSLog(@"JSON: %@", jsonRequest);
    NSLog(@"-----------------------------------------------------");

    NSURL *URL = [NSURL URLWithString:url];
    NSMutableURLRequest *request = [[NSURLRequest requestWithURL:URL] mutableCopy];
    NSDictionary *params = @{@"request": jsonRequest};
    [request setValue:@"application/x-www-form-urlencoded" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPMethod:@"POST"];
    [request setHTTPBody:[self httpBodyForParamsDictionary:params]];

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

    if([object isKindOfClass:[NSDictionary class]])
    {
        NSDictionary *results = object;
        [loader load:results];
    }
    else
    {
        return nil;
    }

    return (GeneralResponse*)loader;
}


@end
