/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RNFIRMessaging.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVCaptureSession.h>
#import <AVFoundation/AVMetadataFormat.h>
#import <AVFoundation/AVMediaFormat.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RedPager"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  
  [UIApplication sharedApplication].idleTimerDisabled = YES;
  
  return YES;
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
  

  
    /*
  if ([device hasTorch])
  {
    [device lockForConfiguration:nil];
    //by these you can use Torch Flash Light..
    [device setTorchMode:AVCaptureTorchModeOn];  // use AVCaptureTorchModeOff to turn off
    [device unlockForConfiguration];
  }
   */
}

 - (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  // custom code to handle notification content
  
  if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
  {
    NSLog( @"INACTIVE" );
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    [device lockForConfiguration:nil];
    //by these you can use Torch Flash Light..
    [device setTorchMode:AVCaptureTorchModeOn];  // use AVCaptureTorchModeOff to turn off
    [device unlockForConfiguration];
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
  {
    NSLog( @"BACKGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else
  {
    NSLog( @"FOREGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
    [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  // If you are receiving a notification message while your app is in the background,
  // this callback will not be fired till the user taps on the notification launching the application.
  // TODO: Handle data of notification
  
  // With swizzling disabled you must let Messaging know about the message, for Analytics
  [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
  
  // Print message ID.
  
  
  NSLog(@"userInfo=>%@", userInfo);
  [FIRMessaging messaging].delegate = self;
  
  // Print full message.
  NSLog(@"%@", userInfo);
  
  completionHandler(UIBackgroundFetchResultNewData);
  
  
  
  // iOS 10 will handle notifications through other methods
  
  //    if( SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO( @"10.0" ) )
  //    {
  //        NSLog( @"iOS version >= 10. Let NotificationCenter handle this one." );
  //        // set a member variable to tell the new delegate that this is background
  //        return;
  //    }
  NSLog( @"HANDLE PUSH, didReceiveRemoteNotification: %@", userInfo );
  
  // custom code to handle notification content
  
  if( [UIApplication sharedApplication].applicationState == UIApplicationStateInactive )
  {
    NSLog( @"INACTIVE" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else if( [UIApplication sharedApplication].applicationState == UIApplicationStateBackground )
  {
    NSLog( @"BACKGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
  else
  {
    NSLog( @"FOREGROUND" );
    completionHandler( UIBackgroundFetchResultNewData );
  }
}

//You can skip this method if you don't want to use local notification
/*
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RNFIRMessaging didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
*/

@end


