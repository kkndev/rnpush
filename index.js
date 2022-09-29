/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'to-parking') {
    // Update external API
    await fetch(`https://google.com`, {
      method: 'GET',
    }).finally(() => console.log('to-parking'));

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }

  if (type === EventType.ACTION_PRESS && pressAction.id === 'turn-off') {
    // Update external API
    await fetch(`https://google.com`, {
      method: 'GET',
    }).finally(() => console.log('turn-off'));

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
