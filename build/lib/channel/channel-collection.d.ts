import { DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { ChannelID, IChannel, IChannelData } from './channel.interface';
import { UserID } from '../user/user.interface';
export declare function _docRef(id: ChannelID): DocumentReference;
export declare function createChannel(id: ChannelID, data: IChannelData): Promise<IChannel>;
export declare function getChannel(id: ChannelID): Promise<IChannel | null>;
export declare function findChannelsByTags(tags?: string[], take?: number, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
export declare function findChannelsByUser(userId: UserID, tags?: string[], take?: number, after?: DocumentSnapshot): Promise<{
    channels: IChannel[];
    next: import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>;
}>;
//# sourceMappingURL=channel-collection.d.ts.map