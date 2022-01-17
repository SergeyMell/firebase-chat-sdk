import { FirebaseAppSettings, FirebaseOptions, initializeApp } from 'firebase/app';

export function initChatApp(options: FirebaseOptions, config?: FirebaseAppSettings) {

    initializeApp(options, config);

}
