import { doc, DocumentReference, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import type { IUser, IUserData, UserID } from './user.interface';
import { docWithId } from '../_utils/firebase-snapshot.utils';

const _collectionPath = '/users';

export function _userDocRef(id: UserID): DocumentReference {
    const db = getFirestore();
    return doc(db, `${_collectionPath}/${id}`);
}

export async function _findOrCreateUser(id: UserID, name: string): Promise<IUser> {
    const user = await _findUser(id);
    if (user) {
        return user;
    }
    return _createUser(id, name);
}

async function _findUser(id: UserID): Promise<IUser | null> {
    const doc = await getDoc(_userDocRef(id));
    if (!doc.exists()) {
        return null;
    }
    return docWithId<IUser>(doc);
}

async function _createUser(id: UserID, name: string): Promise<IUser> {
    const data: IUserData = {name};
    await setDoc(_userDocRef(id), data);
    return Object.assign({id}, data);
}
