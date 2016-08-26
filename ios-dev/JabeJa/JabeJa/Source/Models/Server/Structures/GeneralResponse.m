//
//  GeneralResponse.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/24/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "GeneralResponse.h"

@implementation GeneralResponse

- (void)load:(NSDictionary*)response {
    if ([response isKindOfClass:[NSDictionary class]]) {
        self.message = STRING(@"message");
    }
}

- (BOOL)requireLogin {
    return NO;
}

- (int)getErrorCode {
    return RESULT_SUCCESS;
}

@end
