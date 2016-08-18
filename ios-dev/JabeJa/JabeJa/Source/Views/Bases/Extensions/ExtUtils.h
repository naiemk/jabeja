//
//  ExtUtils.h
//  JabeJa
//
//  Created by Mohammad Ali Yektaie on 8/17/16.
//  Copyright © 2016 Mohammad Ali Yektaie. All rights reserved.
//

#ifndef ExtUtils_h
#define ExtUtils_h

#import <objc/runtime.h>

#define LANGUAGE_TAG_KEY @"LANGUAGE_TAG_KEY"

#define SET_EXT_LANG_TAG(view, tag) objc_setAssociatedObject(view, LANGUAGE_TAG_KEY, tag, OBJC_ASSOCIATION_RETAIN_NONATOMIC)
#define GET_EXT_LANG_TAG(view) objc_getAssociatedObject(view, LANGUAGE_TAG_KEY)


#endif /* ExtUtils_h */
