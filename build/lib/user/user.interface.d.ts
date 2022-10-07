export declare type UserID = string | number;
export interface IUserData {
    name: string;
    userChannels?: {
        firmId: string;
        channelId: string;
    }[];
}
export interface IUser extends IUserData {
    id: UserID;
}
//# sourceMappingURL=user.interface.d.ts.map