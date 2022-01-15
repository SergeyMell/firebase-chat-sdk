import { FirebaseOptions } from '@firebase/app';
import { Chat } from '../src'

const config: FirebaseOptions = {
    // Your firebase config...
}

describe("# Initialize Firebase app", () => {
    it("should initialize firebase", () => {
        new Chat(config);
    });
})
