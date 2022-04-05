import { ChannelID } from '../channel/channel.interface';
import { DocumentSnapshot } from 'firebase/firestore';
import { FileID, IFile } from './files.interface';
export declare function postFile(channelId: ChannelID, fileId: FileID, file: IFile): Promise<IFile>;
export declare function getFiles(channelId: ChannelID, after?: DocumentSnapshot): Promise<unknown[]>;
//# sourceMappingURL=files-collection.d.ts.map