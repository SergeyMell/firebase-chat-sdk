import { initializeApp, FirebaseAppSettings, FirebaseOptions } from 'firebase/app';

export class Chat {
    constructor(options: FirebaseOptions, config?: FirebaseAppSettings) {
        initializeApp(options, config);
    }
}
