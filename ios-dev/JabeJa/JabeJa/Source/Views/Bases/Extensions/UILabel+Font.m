//
//  UILabel+Font.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UILabel+Font.h"
#import "ExtUtils.h"

@implementation UILabel (Font)

- (void)awakeFromNib {
    [super awakeFromNib];

    [self reload];
}

- (void)didMoveToWindow {
    [self reload];
}

- (void)reload {
    if ([self.font.fontName isEqualToString:@".SFUIText-Regular"] ||
        [self.font.fontName isEqualToString:@"Avenir-Medium"] ||
        [self.font.fontName isEqualToString:@"IRANSans"] ||
        [self.font.fontName isEqualToString:@".SFUIText-Semibold"] ) {
        self.font = [Utils createDefaultFont:self.font.pointSize];
    } else {
        self.font = [Utils createDefaultBoldFont:self.font.pointSize];
    }

    NSString* text = [[LanguageStrings instance] get:self.text];
    if (text == nil) {
        text = self.text;

        NSString* tag = GET_EXT_LANG_TAG(self);
        if (tag != nil) {
            text = [[LanguageStrings instance] get:tag];
        }
    } else {
        SET_EXT_LANG_TAG(self, self.text);
    }

    self.text = text;
}

@end
