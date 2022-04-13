import { DocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { IMessage, IMessageData } from './message.interface';
import { ChannelID } from '../channel/channel.interface';
import { UserID } from '../user/user.interface';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import DocumentData = firebase.firestore.DocumentData;
export declare function postMessage(channel: ChannelID, sender: UserID, data: IMessageData): Promise<IMessage>;
export declare function getMessages(channel: ChannelID, take?: number, after?: DocumentSnapshot): Promise<{
    messages: IMessage[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
export declare function subscribeMessage(channelId: ChannelID, callback: (arg0: QuerySnapshot<DocumentData>) => void): Promise<Unsubscribe>;
export declare function unsubscribeMessage(unsubscribe: Unsubscribe): Promise<void>;
//# sourceMappingURL=message-collection.d.ts.map