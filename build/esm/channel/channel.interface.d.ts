import { UserID } from '../user/user.interface';
export declare type ChannelID = string | number;
export declare type FirmID = string | number;
export interface IChannelData {
    title: string;
    payload?: Record<string, any>;
    tags: string[];
}
export interface IChannelRecord {
    title: string;
    payload: string | null;
    tags: Record<string, boolean>;
    members: UserID[];
    updatedAt: number;
}
export interface IChannel extends IChannelData {
    id: ChannelID;
    members: UserID[];
}
//# sourceMappingURL=channel.interface.d.ts.map