import { UserID } from '../user/user.interface';
export declare type MessageID = string;
export interface IMessageData {
    message: string;
    payload?: Record<string, any>;
}
export interface IMessageRecord {
    message: string;
    payload: string;
    sender: UserID;
    createdAt: number;
}
export interface IMessage extends IMessageData {
    id: string;
    sender: UserID;
    createdAt: number;
}
//# sourceMappingURL=message.interface.d.ts.map