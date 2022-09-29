/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

notifee.onForegroundEvent(({type, detail}) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
    console.log('User pressed an action with the id: ', detail.pressAction.id);
  }
});
const onMessageReceived = async (message: any) => {
  console.log(message);
  const channelId = await notifee.createChannel({
    id: 'back',
    name: 'Back Channel',
  });
  notifee.displayNotification({
    title: 'Your order has been shipped',
    body: 'Your order was shipped at !',
    android: {
      channelId,
      actions: [
        {
          title: 'Turn off',
          pressAction: {
            id: 'turn-off',
          },
        },
        {
          title: 'To parking',
          pressAction: {
            id: 'to-parking',
          },
        },
      ],
    },
  });
  return false;
};

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  console.log(token);
  // Save the token
  // await postToApi('/users/1234/tokens', { token });
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    onAppBootstrap();
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Your order has been shipped',
      body: 'Your order was shipped at !',
      android: {
        channelId,
        actions: [
          {
            title: 'Turn off',
            pressAction: {
              id: 'turn-off',
            },
          },
          {
            title: 'To parking',
            pressAction: {
              id: 'to-parking',
            },
          },
        ],
      },
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View>
            <Button
              title="Display Notification"
              onPress={onDisplayNotification}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
