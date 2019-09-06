import {Component} from 'react';
import {Alert} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class PushNotificationHandler extends Component {
  componentDidMount() {
    console.log('component did mount');
    PushNotificationIOS.addEventListener('register', token => {
      console.log('token: ', token);
      Alert.alert(token);
    });

    PushNotificationIOS.addEventListener(
      'registrationError',
      registrationError => {
        console.log(registrationError, '--');
      },
    );

    PushNotificationIOS.addEventListener('notification', function(
      notification,
    ) {
      console.log('Log - notification is open', notification);
      if (!notification) {
        return;
      }
      const data = notification.getData();
      Alert.alert(JSON.stringify({data, source: 'CollapsedApp'}));
    });

    PushNotificationIOS.getInitialNotification().then(notification => {
      console.log('Log - notification from closed', notification);
      if (!notification) {
        return;
      }
      const data = notification.getData();
      Alert.alert(JSON.stringify({data, source: 'ClosedApp'}));
    });
    PushNotificationIOS.requestPermissions();
  }

  render() {
    return null;
  }
}

export default PushNotificationHandler;
