import {
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    where
} from 'firebase/firestore';
import { BaseEntity } from './base.entity';
import { UserID } from './user';
import { docWithId } from './utils/doc.utils';

export type ChannelId = string | number;

export interface IChannelData {
    title: string;
    payload: string;
    tags: string[];
    members: UserID[]
}

export interface IChannel extends IChannelData {
    id: ChannelId;
}

export class Channel extends BaseEntity {

    collectionPath = '/channels';

    get collectionRef(): CollectionReference {
        return collection(this.db, this.collectionPath);
    }

    docRef(id: ChannelId): DocumentReference {
        return doc(this.db, `${this.collectionPath}/${id}`);
    }

    async createChannel(id: ChannelId, data: IChannelData): Promise<IChannel> {
        await setDoc(this.docRef(id), data);
        return Object.assign({id: id}, data);
    }

    async getChannel(id: ChannelId) {
        const doc = await getDoc(this.docRef(id));
        if (!doc.exists()) {
            return null;
        }
        return docWithId<IChannel>(doc);
    }

    async getChannels(tags: string[] = [], snapshot?: DocumentSnapshot) {
        const queryConstraints = [
            orderBy('title', 'desc'),
            limit(3)
        ];
        if (snapshot) {
            queryConstraints.push(startAfter(snapshot))
        }
        if (tags.length === 1) {
            queryConstraints.push(where('tags', 'array-contains', tags));
        } else if (tags.length > 1) {
            queryConstraints.push(where('tags', 'array-contains-any', tags));
        }
        const q = query(this.collectionRef, ...queryConstraints);
        const docs = await getDocs(q).then(response => response.docs);
        return {
            channels: docs.map(docWithId),
            next: docs[docs.length - 1],
        };
    }
}
