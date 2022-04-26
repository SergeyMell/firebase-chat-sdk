import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { ChannelID, IChannel, IChannelData } from './channel.interface';
import { UserID } from '../user/user.interface';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
export declare function _docRef(id: ChannelID): DocumentReference;
export declare function createChannel(id: ChannelID, data: IChannelData): Promise<IChannel>;
export declare function updateChannel(id: ChannelID, data: IChannel): Promise<IChannel>;
export declare function getChannel(id: ChannelID): Promise<IChannel | null>;
export declare function findChannelsByTags(tags?: string[], take?: number, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<DocumentData>;
}>;
export declare function findChannelsByUser(userId: UserID, tags?: string[], take?: number, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<DocumentData>;
}>;
export declare function subscribeChannel(callback: (channels: IChannel[]) => void): Promise<Unsubscribe>;
export declare function unsubscribeChannel(unsubscribe: Unsubscribe): Promise<void>;
//# sourceMappingURL=channel-collection.d.ts.map