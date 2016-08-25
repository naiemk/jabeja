//
//  GeneralResponse.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/24/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Server.h"

@interface GeneralResponse : NSObject <IResultLoader>

@property (strong, nonatomic) NSString* message;

- (BOOL)requireLogin;
- (void)load:(NSDictionary*)response;
- (int)getErrorCode;

@end
