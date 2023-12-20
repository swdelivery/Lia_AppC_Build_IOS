#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

//#import "RNBootSplash.h"
#import <Firebase.h>
#import <SDWebImage/SDImageCache.h>
#import <SDWebImage/SDWebImageManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  SDImageCache.sharedImageCache.config.maxDiskAge = 3600 * 24 * 7; // 1 Week
  SDImageCache.sharedImageCache.config.maxMemoryCost = 1024 * 1024 * 4 * 20; // 20 images (1024 * 1024 pixels)
  SDImageCache.sharedImageCache.config.shouldCacheImagesInMemory = NO; // Disable memory cache, may cause cell-reusing flash because disk query is async
  SDImageCache.sharedImageCache.config.shouldUseWeakMemoryCache = NO; // Disable weak cache, may see blank when return from background because memory cache is purged under pressure
  SDImageCache.sharedImageCache.config.diskCacheReadingOptions = NSDataReadingMappedIfSafe; // Use mmap for disk cache query
  SDWebImageManager.sharedManager.optionsProcessor = [SDWebImageOptionsProcessor optionsProcessorWithBlock:^SDWebImageOptionsResult * _Nullable(NSURL * _Nullable url, SDWebImageOptions options, SDWebImageContext * _Nullable context) {
       // Disable Force Decoding in global, may reduce the frame rate
       options |= SDWebImageAvoidDecodeImage;
       return [[SDWebImageOptionsResult alloc] initWithOptions:options context:context];
  }];
  
  self.moduleName = @"LiaAppC";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                           initProps:(NSDictionary *)initProps {
  UIView *rootView = [super createRootViewWithBridge:bridge
                                          moduleName:moduleName
                                           initProps:initProps];

  // [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen

  return rootView;
}

@end
