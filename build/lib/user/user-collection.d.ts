import { DocumentReference } from 'firebase/firestore';
import type { IUser, UserID } from './user.interface';
export declare function _userDocRef(id: UserID): DocumentReference;
export declare function _findOrCreateUser(id: UserID, name: string): Promise<IUser>;
//# sourceMappingURL=user-collection.d.ts.map