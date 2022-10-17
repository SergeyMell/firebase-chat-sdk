import { DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import type { IUser, UserID } from './user.interface';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
export declare function _userDocRef(id: UserID): DocumentReference;
export declare function _findOrCreateUser(id: UserID, name: string): Promise<IUser>;
export declare function subscribeUser(userId: string, callback: (channelData: DocumentSnapshot) => void): Promise<Unsubscribe>;
export declare function unsubscribeUser(unsubscribe: Unsubscribe): Promise<void>;
//# sourceMappingURL=user-collection.d.ts.map