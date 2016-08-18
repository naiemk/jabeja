//
//  Theme.h
//  MuslimLib
//
//  Created by Mohammad Ali Yektaie on 8/5/16.
//  Copyright © 2016 YekiSoft. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface Theme : NSObject

+ (Theme*) instance;

- (void) invalidate;

@property (strong, nonatomic) UIColor* navigationBarTintColor;

@end
