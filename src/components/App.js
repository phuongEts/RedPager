import React, { Component } from 'react';
import { Platform, Vibration, NativeModules } from 'react-native';

import { Provider } from 'react-redux';
//import { Worker } from 'react-native-workers';
import Sound from 'react-native-sound';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
const { RNControlFlashlight } = NativeModules;

import Main from './screens/main/Main';
import store from './redux/Store';


class App extends Component {
    componentDidMount() {
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
            console.log(token)
            // fcm token may not be available on first load, catch it here
        });

        Sound.setCategory('playback');

        FCM.requestPermissions();
        FCM.getFCMToken().then(token => {
            console.log('TOKEN (getFCMToken)', token);
        });

        FCM.on(FCMEvent.Notification, async (notif) => {
            console.log('notif (notif)', notif);
            const mySound = new Sound('OMFG-Hello-OMFG.mp3', Sound.MAIN_BUNDLE, (e) => {
                if (e) {
                //console.log('error', e);
                } else {
                //console.log('duration', mySound.getDuration());
                mySound.play();
                }
            });
            RNControlFlashlight.turnFlashlight(
                "flashlightOn", // flashlightOn, flashlightOff

                function errorCallback(results) {
                    console.log('JS Error: ' + results['errMsg']);
                },

                function successCallback(results) {
                    console.log('JS Success: ' + results['successMsg']);
                }
            );
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if(notif.local_notification){
                //this is a local notification
            }
            if(notif.opened_from_tray){
                //app is open/resumed because user clicked banner
                alert('app is open');
            }
            
            if(Platform.OS ==='ios'){
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link. 
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch(notif._notificationType){
                case NotificationType.Remote:
                    notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                    break;
                case NotificationType.NotificationResponse:
                    notif.finish();
                    break;
                case NotificationType.WillPresent:
                    notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                    //Vibration.vibrate([0, 500, 200, 500]);
                    break;
                }
            }
        });
    }

    render() {
        return (
            <Provider store={store} >
                <Main />
            </Provider>
        );
    }
    
}
export default App;
