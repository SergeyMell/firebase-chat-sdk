import { getAuth, signInAnonymously, UserCredential } from "firebase/auth";
import { doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
import { docWithId } from './utils/doc.utils';
import { BaseEntity } from './base.entity';

export type UserID = string | number;

export interface IProfile {
    name: string;
}

export interface IUser extends IProfile {
    id: UserID;
}

export class User extends BaseEntity {

    collectionPath = '/users';

    constructor(private id: string | number, private name: string) {
        super();
    }

    get docRef(): DocumentReference {
        return doc(this.db, `${this.collectionPath}/${this.id}`);
    }

    async authorizeUser(): Promise<UserCredential> {
        const auth = getAuth();
        return signInAnonymously(auth);
    }

    async connect(): Promise<IUser> {
        await this.authorizeUser();
        const user = await this.findUser();
        if (user) {
            return user;
        }
        return this.createUser();
    }

    private async findUser(): Promise<IUser | null> {
        const doc = await getDoc(this.docRef);
        if (!doc.exists()) {
            return null;
        }
        return docWithId<IUser>(doc);
    }

    private async createUser(): Promise<IUser> {
        const data: IProfile = {
            name: this.name
        };
        await setDoc(this.docRef, data);
        return Object.assign({id: this.id}, data);
    }
}
