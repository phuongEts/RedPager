import React, { Component } from 'react';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class PushNotification extends Component {
  componentWillMount() {
    // Request permissions for ios
    FCM.requestPermissions()

    FCM.getFCMToken().then(token => {
      //this.props.storeFCMToken(token)
      console.log(token);
    })

    FCM.getInitialNotification().then(notif => {
      console.log("Initial Notification", notif)
    })

    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      // TODO: Called twice for every notif
      console.log(notif);
      if (notif.local_notification){
        console.log('local notification')
        return
      }
      if (notif.opened_from_tray) {
        console.log('opened from tray')
        return
      }
    })

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      //this.props.storeFCMToken(token)
      console.log(token);
    })
  }

  componentWillUnmount() {
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  }

  render() {
    return null
  }
}