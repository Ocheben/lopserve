#import <UIKit/UIKit.h>

@class Presenter;

@interface ViewController : UIViewController

@property(readonly, nonatomic) Presenter *presenter;

// Designated initializer.
- (id)initWithPresenter:(Presenter *)presenter;

- (void)dismissViewControllerAnimated:(BOOL)animated
                  withCompletionBlock:(void (^)(void))completionBlock;

@end
