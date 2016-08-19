//
//  UITextField+Language.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/18/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UITextField+Language.h"
#import "ExtUtils.h"

@implementation UITextField (Font)

- (void)awakeFromNib {
    [super awakeFromNib];

    [self reload];
}

- (void)didMoveToWindow {
    [self reload];
}

- (void)reload {

    self.font = [Utils createDefaultFont:self.font.pointSize];

    NSString* placeholder = [[LanguageStrings instance] get:self.placeholder];
    if (placeholder == nil) {
        placeholder = self.placeholder;

        NSString* tag = GET_EXT_LANG_TAG(self);
        if (tag != nil) {
            placeholder = [[LanguageStrings instance] get:tag];
        }
    } else {
        SET_EXT_LANG_TAG(self, self.placeholder);
    }

    self.placeholder = placeholder;
}

@end