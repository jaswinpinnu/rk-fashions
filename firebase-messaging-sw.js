importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCO9YJ1SoZbmxWtiDhORRFqfNsDW48km6o",
  authDomain: "rkfashions-cf673.firebaseapp.com",
  projectId: "rkfashions-cf673",
  storageBucket: "rkfashions-cf673.firebasestorage.app",
  messagingSenderId: "285126427237",
  appId: "1:285126427237:web:1eeceefbab182c81337c8c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/rk-fashions/icon-192.png"
  });
});
