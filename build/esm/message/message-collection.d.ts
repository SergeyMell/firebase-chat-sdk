import { DocumentSnapshot } from 'firebase/firestore';
import { IMessage, IMessageData } from './message.interface';
import { ChannelID } from '../channel/channel.interface';
import { UserID } from '../user/user.interface';
export declare function postMessage(channel: ChannelID, sender: UserID, data: IMessageData): Promise<IMessage>;
export declare function getMessages(channel: ChannelID, take?: number, after?: DocumentSnapshot): Promise<{
    messages: IMessage[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
//# sourceMappingURL=message-collection.d.ts.map