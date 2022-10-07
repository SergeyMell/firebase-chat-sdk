import { ChannelID, FirmID } from './channel.interface';
import { UserID } from '../user/user.interface';
export declare function addUserToChannel(channelId: ChannelID, userId: UserID, userName: string, firmId: FirmID): Promise<void>;
export declare function removeUserFromChannel(channelId: ChannelID, userId: UserID): Promise<void>;
export declare function updateChannel(channelId: ChannelID, payload: string, updatedAt?: number): Promise<void>;
//# sourceMappingURL=channel.d.ts.map