//
//  UINavigationItem+Language.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UINavigationItem+Language.h"

@implementation UINavigationItem (Language)

- (void)awakeFromNib {
    [super awakeFromNib];

    NSString* text = [[LanguageStrings instance] get:self.title];
    if (text == nil) {
        text = self.title;
    }

    self.title = text;
}

@end
