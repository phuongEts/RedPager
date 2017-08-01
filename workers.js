import { self } from 'react-native-workers';
import FCM from 'react-native-fcm';
import Sound from 'react-native-sound';

/*
 * Web Worker
 * you have access to all RN native modules (timeout, fetch, AsyncStorage, Vibration ...)
 */

// receive messages from main thread
self.onmessage = (message) => {
  console.log('worker received message', message);
};

/**
 * config react native sound
 */

// Enable playback in silence mode (iOS only)
Sound.setCategory('playback');


function showLocalNotification() {
  //console.log('click local notification');
  FCM.presentLocalNotification({
    vibrate: 500,
    title: 'Hello',
    body: 'Test Notification',
    priority: 'high',
    show_in_foreground: true,
    picture: 'https://firebase.google.com/_static/af7ae4b3fc/images/firebase/lockup.png'
  });
}

function ping() {
  // send messages to main thread
  //self.postMessage('ping');
  showLocalNotification();

  const mySound = new Sound('OMFG-Hello-OMFG.mp3', Sound.MAIN_BUNDLE, (e) => {
    if (e) {
      //console.log('error', e);
    } else {
      //console.log('duration', mySound.getDuration());
      mySound.play();
    }
  });
  console.log('check worker!');
  setTimeout(ping, 10000);
}


setTimeout(ping, 10000);
