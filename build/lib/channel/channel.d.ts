import { ChannelID } from './channel.interface';
import { UserID } from '../user/user.interface';
export declare function addUserToChannel(channelId: ChannelID, userId: UserID): Promise<void>;
export declare function removeUserFromChannel(channelId: ChannelID, userId: UserID): Promise<void>;
export declare function updateChannel(channelId: ChannelID, payload: Record<string, boolean>): Promise<void>;
//# sourceMappingURL=channel.d.ts.map