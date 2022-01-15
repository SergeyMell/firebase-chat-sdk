import { getAuth, signInAnonymously, UserCredential } from "firebase/auth";
import { UserCollection } from './user-collection';
import { Channel } from '../channel/channel';

export type UserID = string | number;

export interface IProfile {
    name: string;
}

export interface IUser extends IProfile {
    id: UserID;
}

export class User extends UserCollection implements IUser {

    constructor(public id: string | number, public name: string) {
        super();
    }

    private static async authorize(): Promise<UserCredential> {
        const auth = getAuth();
        return signInAnonymously(auth);
    }

    async connect(): Promise<User> {
        await User.authorize();
        return UserCollection.findOrCreate(this.id, this.name);
    }

    joinChannel(channel: Channel) {
        return channel.addUser(this);
    }

    leaveChannel(channel: Channel) {
        return channel.removeUser(this);
    }
}
