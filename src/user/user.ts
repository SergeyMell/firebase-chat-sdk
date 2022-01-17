import { getAuth, signInAnonymously, UserCredential } from "firebase/auth";
import { IUser, UserID } from './user.interface';
import { _findOrCreateUser } from './user-collection';

async function _authorizeUser(): Promise<UserCredential> {
    const auth = getAuth();
    return signInAnonymously(auth);
}

export async function connectUser(id: UserID, userName: string): Promise<IUser> {
    await _authorizeUser();
    return _findOrCreateUser(id, userName);
}
