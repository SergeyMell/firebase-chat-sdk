import { ChannelID } from '../channel/channel.interface';
import { DocumentSnapshot } from 'firebase/firestore';
import { IMedia } from './media.interface';
import { DocumentReference } from '@firebase/firestore';
export declare function postMedia(channelId: ChannelID, media: IMedia[]): Promise<DocumentReference>;
export declare function getMedia(channelId: ChannelID, after?: DocumentSnapshot): Promise<import("@firebase/firestore").QueryDocumentSnapshot<import("@firebase/firestore").DocumentData>[]>;
//# sourceMappingURL=media-collection.d.ts.map