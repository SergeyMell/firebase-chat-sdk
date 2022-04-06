import { DocumentSnapshot } from 'firebase/firestore';
import { IMessage, IMessageData, MessageID } from './message.interface';
import { ChannelID } from '../channel/channel.interface';
import { UserID } from '../user/user.interface';
export declare function postMessage(channel: ChannelID, sender: UserID, data: IMessageData): Promise<IMessage>;
export declare function getMessages(channel: ChannelID, take?: number, after?: DocumentSnapshot): Promise<{
    messages: IMessage[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
export declare function updateMessage(channelId: ChannelID, messageId: MessageID, sender: UserID, data: IMessageData): Promise<DocumentSnapshot>;
//# sourceMappingURL=message-collection.d.ts.map