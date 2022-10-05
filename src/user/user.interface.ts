export type UserID = string | number;

export interface IUserData {
    name: string;
    userChannels?: string[];
}

export interface IUser extends IUserData {
    id: UserID;
}
