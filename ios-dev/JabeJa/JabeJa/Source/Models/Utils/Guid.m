//
//  Guid.m
//  MemoreX
//
//  Created by Mohammad Ali Yektaie on 7/29/15.
//  Copyright (c) 2015 Mohammad Ali Yektaie. All rights reserved.
//

#import "Guid.h"

@interface Guid() {
    NSString* _value;
}

@end

@implementation Guid

- (instancetype) initWithString:(NSString*)value {
    self = [super init];
    
    if (self) {
        _value = value;
    }
    
    return self;
}

+ (Guid*)empty {
    return [[Guid alloc] initWithString:@"00000000-0000-0000-0000-000000000000"];
}

- (BOOL)isEmpty {
    return [_value isEqualToString:@"00000000-0000-0000-0000-000000000000"];
}

+ (Guid*)newGuid {
    NSString* p1 = [self getRandomString:8];
    NSString* p2 = [self getRandomString:4];
    NSString* p3 = [self getRandomString:4];
    NSString* p4 = [self getRandomString:4];
    NSString* p5 = [self getRandomString:12];
    
    NSString* g = p1;
    g = [g stringByAppendingString:@"-"];
    g = [g stringByAppendingString:p2];
    g = [g stringByAppendingString:@"-"];
    g = [g stringByAppendingString:p3];
    g = [g stringByAppendingString:@"-"];
    g = [g stringByAppendingString:p4];
    g = [g stringByAppendingString:@"-"];
    g = [g stringByAppendingString:p5];
    
    return [[Guid alloc] initWithString:g];
}

+ (NSString*)getRandomString:(int)length {
    NSString* hexArray = @"0123456789abcdef";
    NSString* result = @"";
    NSRange range;
    range.length = 1;
    
    for (int i = 0; i < length; i++) {
        range.location = arc4random() % 16;
        NSString* character = [hexArray substringWithRange:range];
        result = [result stringByAppendingString:character];
    }
    
    return result;
}

- (NSString*)description {
    return _value;
}

- (BOOL)isEqual:(id)object
{
    BOOL result = [object isKindOfClass:[Guid class]];
    
    if (result) {
        Guid* g = (Guid*)object;
        result = [[g description] isEqual:[self description]];
    }
    
    return result;
}

@end
