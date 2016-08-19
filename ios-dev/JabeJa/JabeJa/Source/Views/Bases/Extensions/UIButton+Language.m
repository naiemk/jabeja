//
//  Button+Language.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UIButton+Language.h"
#import "ExtUtils.h"

@implementation UIButton (Font)

- (void)awakeFromNib {
    [super awakeFromNib];

    [self reload];
}

- (void)didMoveToWindow {
    [self reload];
}

- (void)reload {

//    if (![self.font.fontName isEqualToString:@".SFUIDisplay-Regular"]) {
//        if ([self.font.fontName isEqualToString:@".SFUIText-Regular"] ||
//            [self.font.fontName isEqualToString:@"Avenir-Medium"] ||
//            [self.font.fontName isEqualToString:@"IRANSans"] ||
//            [self.font.fontName isEqualToString:@".SFUIText-Semibold"] ) {
//            self.title: = [Utils createDefaultFont:self.font.pointSize];
//        } else {
//            self.font = [Utils createDefaultBoldFont:self.font.pointSize];
//        }
//    }

    NSString* text = [[LanguageStrings instance] get:self.currentTitle];
    if (text == nil) {
        text = self.currentTitle;

        NSString* tag = GET_EXT_LANG_TAG(self);
        if (tag != nil) {
            text = [[LanguageStrings instance] get:tag];
        }
    } else {
        SET_EXT_LANG_TAG(self, self.currentTitle);
    }

    [self setTitle:text forState:UIControlStateNormal];
}

@end