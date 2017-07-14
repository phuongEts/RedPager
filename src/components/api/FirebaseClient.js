import FirebaseConstants from './FirebaseConstants';

const API_URL = 'https://fcm.googleapis.com/fcm/send';

class FirebaseClient {

  constructor() {
    this.sendData = this.sendData.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
    this.sendNotificationWithData = this.sendNotificationWithData.bind(this);
  }

  sendNotification(token) {
    const body = {
      to: token,
      notification: {
      type: 'Send Alert', 
      vibrate: 1, 
      light: 0, 
      sound: 0, 
      idUserAlert: 35, 
      nameUserAlert: 'asjdhsa',
      idAlert: 123232323232
    },
    priority: 10
  };

    this.send(JSON.stringify(body), 'notification');
  }

  sendData(token) {
    const body = {
      to: token,
      data: {
        title: 'Simple FCM Client',
        body: 'This is a notification with only DATA.',
        sound: 'default',
        click_action: 'fcm.ACTION.HELLO',
        remote: true
      },
      priority: 'normal'
    };

    this.send(JSON.stringify(body), 'data');
  }

  sendNotificationWithData(token) {
    const body = {
      to: token,
      notification: {
        title: 'Simple FCM Client',
        body: 'This is a notification with NOTIFICATION and DATA (NOTIF).',
        sound: 'default',
        click_action: 'fcm.ACTION.HELLO'
      },
      data: {
        title: 'Simple FCM Client',
        body: 'This is a notification with NOTIFICATION and DATA (DATA)',
        click_action: 'fcm.ACTION.HELLO',
        remote: true
      },
      priority: 'high'
    };

    this.send(JSON.stringify(body), 'notification-data');
  }

  send(body, type) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Length': parseInt(body.length),
      Authorization: 'key=AIzaSyAxe5XnltW2HtYJvCJwqSsjupJMG2k80lA'
    });

    fetch(API_URL, { method: 'POST', headers, body })
      .then(response => {
        console.log('send reponse');
        console.log("Send " + type + " response", response);
      })
      .catch(error => {
        console.log('send error:');
        console.log("Error sending " + type, error);
      });
  }

}


const firebaseClient = new FirebaseClient();
export default firebaseClient;
