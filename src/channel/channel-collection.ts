import {
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    query,
    QueryConstraint,
    setDoc,
    startAfter,
    where,
} from 'firebase/firestore';
import { Channel, ChannelID, IChannel, IChannelData } from './channel';
import { UserID } from '../user/user';

export class ChannelCollection {
    static collectionPath = '/channels';

    private static get collectionRef(): CollectionReference {
        const db = getFirestore();
        return collection(db, ChannelCollection.collectionPath);
    }

    static async create(id: ChannelID, data: IChannelData): Promise<IChannel> {
        await setDoc(ChannelCollection.docRef(id), {data});
        return Object.assign({id: id}, data);
    }

    static async get(id: ChannelID): Promise<Channel | null> {
        const doc = await getDoc(this.docRef(id));
        if (!doc.exists()) {
            return null;
        }
        return new Channel(doc.id, doc.data() as IChannelData);
    }

    static async findByTags(tags: string[] = [], take = 10, after?: DocumentSnapshot) {
        const queryConstraints = [
            limit(take)
        ];
        if (after) {
            queryConstraints.push(startAfter(after));
        }
        if (tags.length === 1) {
            const tag = tags[0];
            queryConstraints.push(where('tags', 'array-contains', tag));
        } else if (tags.length > 1) {
            queryConstraints.push(where('tags', 'array-contains-any', tags));
        }
        return ChannelCollection.findByQuery(queryConstraints);
    }

    static async findByUser(userId: UserID, take = 10, after?: DocumentSnapshot) {
        const queryConstraints = [
            where('members', 'array-contains', userId),
            limit(take)
        ];
        if (after) {
            queryConstraints.push(startAfter(after));
        }
        queryConstraints.push(
            where('title', '==', 'Channel 1'),
            where('payload', '==', '{"hello":"World"}')
        )
        return ChannelCollection.findByQuery(queryConstraints);
    }

    protected static docRef(id: ChannelID): DocumentReference {
        const db = getFirestore();
        return doc(db, `${ChannelCollection.collectionPath}/${id}`);
    }

    private static async findByQuery(queryConstraints: QueryConstraint[]) {
        const q = query(ChannelCollection.collectionRef, ...queryConstraints);
        const docs = await getDocs(q).then(response => response.docs);
        return {
            channels: docs.map(d => new Channel(d.id, d.data() as IChannelData)),
            next: docs[docs.length - 1],
        };
    }
}
