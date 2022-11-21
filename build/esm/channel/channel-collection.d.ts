import { DocumentReference, DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { ChannelID, IChannel, IChannelData } from './channel.interface';
import { UserID } from '../user/user.interface';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import { WriteBatch } from '@firebase/firestore';
export declare function _docRef(id: ChannelID): DocumentReference;
export declare function batchRef(): WriteBatch;
export declare function createChannel(id: ChannelID, data: IChannelData): Promise<IChannel>;
export declare function getChannel(id: ChannelID): Promise<IChannel | null>;
export declare function findChannelsByTags(tags?: string[], take?: number, sortByLastUpdate?: boolean, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
export declare function findChannelsByUser(userId: UserID, tags?: string[], take?: number, sortByLastUpdate?: boolean, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
export declare function subscribeChannels(callback: (channels: IChannel[], channelData: QuerySnapshot) => void): Promise<Unsubscribe>;
export declare function subscribeChannel(channelId: string, callback: (channelData: DocumentSnapshot) => void): Promise<Unsubscribe>;
export declare function unsubscribeChannel(unsubscribe: Unsubscribe): Promise<void>;
//# sourceMappingURL=channel-collection.d.ts.map