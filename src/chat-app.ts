import { FirebaseAppSettings, FirebaseOptions, initializeApp } from 'firebase/app';

export class ChatApp {

    constructor(options: FirebaseOptions, config?: FirebaseAppSettings) {
        initializeApp(options, config);
    }
}
