# server
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)})
const registrationToken = 'ef_odwLNTCCzi4kK2W_-5l:APA91bGzh9fD0sumzz96izLnZ_WIDPU-8w5Aq3LUie4BhLGNcT1ySePrlAAtMvoC0uXVUMWj2R5h6OQmkdeQsqGdWxV28kb8B-GzNvLcb8wLSB8o0d3zH3uQcgvxOg4k3V2btMDEkxgt';
admin.messaging().sendToDevice(
    [registrationToken], // device fcm tokens...
    {
        data: {
            owner: 'JSON.stringify(owner)',
            picture: 'JSON.stringify(picture)',
        },
    },
    {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: 'high',
    },
);
