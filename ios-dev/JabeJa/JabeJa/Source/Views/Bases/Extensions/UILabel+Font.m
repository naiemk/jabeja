//
//  UILabel+Font.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UILabel+Font.h"

@implementation UILabel (Font)

- (void)awakeFromNib {
    [super awakeFromNib];

    if ([self.font.fontName isEqualToString:@".SFUIText-Regular"]) {
        self.font = [Utils createDefaultFont:self.font.pointSize];
    } else {
        self.font = [Utils createDefaultBoldFont:self.font.pointSize];
    }

    NSString* text = [[LanguageStrings instance] get:self.text];
    if (text == nil) {
        text = self.text;
    }

    self.text = text;
}

@end
