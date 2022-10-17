import { doc, DocumentReference, DocumentSnapshot, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import type { IUser, IUserData, UserID } from './user.interface';
import { docWithId } from '../_utils/firebase-snapshot.utils';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import { _docRef } from '../channel/channel-collection';

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

export async function subscribeUser(userId: UserID, callback: (channelData: DocumentSnapshot) => void): Promise<Unsubscribe> {
  return onSnapshot(_userDocRef(userId), (channelData) => {
    callback(channelData);
  });
}

export async function unsubscribeUser(unsubscribe: Unsubscribe): Promise<void> {
  unsubscribe();
}
