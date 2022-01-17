export type UserID = string | number;

export interface IUserData {
    name: string;
}

export interface IUser extends IUserData {
    id: UserID;
}
