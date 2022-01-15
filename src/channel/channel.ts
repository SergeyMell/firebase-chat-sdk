import { ChannelCollection } from './channel-collection';
import { User, UserID } from '../user/user';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

export type ChannelID = string | number;

export interface IChannelData {
    title: string;
    payload: Record<string, any>;
    tags: string[];
    members: UserID[];
}

export interface IChannel extends IChannelData {
    id: ChannelID;
}

export class Channel extends ChannelCollection implements IChannel {

    private docRef = Channel.docRef(this.id);

    constructor(public id: ChannelID, private data: IChannelData) {
        super();
    }

    get title(): string {
        return this.data.title;
    }

    get members(): UserID[] {
        return this.data.members;
    };

    get payload(): Record<string, any> {
        return this.data.payload;
    }

    get tags(): string[] {
        return this.data.tags;
    }

    async addUser(user: User): Promise<void> {
        await updateDoc(this.docRef, {
            members: arrayUnion(user.id)
        });
        this.data.members.push(user.id);
    }

    async removeUser(user: User): Promise<void> {
        await updateDoc(this.docRef, {
            members: arrayRemove(user.id)
        });
        this.data.members = this.data.members.filter(id => id !== user.id);
    }
}
