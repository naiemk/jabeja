//
//  Guid.h
//  MemoreX
//
//  Created by Mohammad Ali Yektaie on 7/29/15.
//  Copyright (c) 2015 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Guid : NSObject

- (instancetype) initWithString:(NSString*)value;

+ (Guid*)newGuid;
+ (Guid*)empty;

- (BOOL)isEmpty;

- (BOOL)isEqual:(id)object;
@end
