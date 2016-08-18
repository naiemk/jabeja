//
//  UIBarButtonItem+Language.m
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#import "UIBarButtonItem+Language.h"
#import "ExtUtils.h"

@implementation UIBarButtonItem (Language)

- (void)awakeFromNib {
    [super awakeFromNib];

    [self reload];
}

- (void)didMoveToWindow {
    [self reload];
}

- (void)reload {
    NSString* text = [[LanguageStrings instance] get:self.title];
    if (text == nil) {
        text = self.title;

        NSString* tag = GET_EXT_LANG_TAG(self);
        if (tag != nil) {
            text = [[LanguageStrings instance] get:tag];
        }
    } else {
        SET_EXT_LANG_TAG(self, self.title);
    }

    self.title = text;

    CGFloat fontSize = [L(@"NavigationControllerTitleFontSize") intValue] * 0.85f;
    [self setTitleTextAttributes:@{ NSFontAttributeName:[Utils createDefaultFont:fontSize]} forState:UIControlStateNormal];

}

@end
