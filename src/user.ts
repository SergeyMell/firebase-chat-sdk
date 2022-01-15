import { getAuth, signInAnonymously, UserCredential } from "firebase/auth";
import { doc, DocumentReference, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { docWithId } from './utils/doc.utils';

export type UserID = string | number;

export interface IUser {
    id: UserID;
    name: string;
}

export class User {

    private db = getFirestore();
    private collectionPath = '/users';

    constructor(private id: string | number, private name: string) {
    }

    get docRef(): DocumentReference {
        return doc(this.db, `${this.collectionPath}/${this.id}`);
    }

    async connect() {
        await this.authorizeUser();
        const user = await this.findUser();
        if (user) {
            return user;
        }
        return this.createUser();
    }

    async authorizeUser(): Promise<UserCredential> {
        const auth = getAuth();
        return signInAnonymously(auth);
    }

    async findUser(): Promise<IUser | null> {
        const doc = await getDoc(this.docRef);
        if (!doc.data()) {
            return null;
        }
        return docWithId<IUser>(doc);
    }

    async createUser(): Promise<IUser> {
        const data = {
            name: this.name
        }
        await setDoc(this.docRef, data);
        return Object.assign({id: this.id}, data);
    }
}
