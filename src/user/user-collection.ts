import { doc, DocumentReference, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { IProfile, User, UserID } from './user';

export class UserCollection {

    static collectionPath = '/users';

    protected static docRef(id: UserID): DocumentReference {
        const db = getFirestore();
        return doc(db, `${UserCollection.collectionPath}/${id}`);
    }

    protected static async findOrCreate(id: UserID, name: string): Promise<User> {
        const user = await this.find(id);
        if (user) {
            return user;
        }
        return this.create(id, name);
    }

    private static async find(id: UserID): Promise<User | null> {
        const doc = await getDoc(UserCollection.docRef(id));
        if (!doc.exists()) {
            return null;
        }
        return new User(id, doc.data().name);
    }

    private static async create(id: UserID, name: string): Promise<User> {
        const data: IProfile = {name};
        await setDoc(UserCollection.docRef(id), data);
        return new User(id, name);
    }
}
