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
import { ChannelID, IChannel, IChannelData, IChannelRecord } from './channel.interface';
import { docWithId } from '../_utils/firebase-snapshot.utils';
import { UserID } from '../user/user.interface';
import { arrayToObject, objectToArray } from '../_utils/array.utils';

const _collectionPath = '/channels';

function _collectionRef(): CollectionReference {
    const db = getFirestore();
    return collection(db, _collectionPath);
}

export function _docRef(id: ChannelID): DocumentReference {
    const db = getFirestore();
    return doc(db, `${_collectionPath}/${id}`);
}

function channelRecordToChannel(record: IChannelRecord, id: ChannelID): IChannel {
    let payload = null;
    try {
        payload = JSON.parse(record.payload || 'null');
    } catch {
    }
    return {
        id: id,
        title: record.title,
        payload: payload,
        tags: objectToArray(record.tags),
        members: record.members
    };
}

export async function createChannel(id: ChannelID, data: IChannelData): Promise<IChannel> {
    const tags = arrayToObject(data.tags);
    const channel: IChannelRecord = {
        title: data.title,
        payload: JSON.stringify(data.payload || null),
        tags,
        members: []
    };
    await setDoc(_docRef(id), {data: channel});
    return channelRecordToChannel(channel, id);
}

export async function getChannel(id: ChannelID): Promise<IChannel | null> {
    const doc = await getDoc(_docRef(id));
    if (!doc.exists()) {
        return null;
    }
    const channel: IChannelRecord = docWithId(doc);
    return channelRecordToChannel(channel, doc.id);
}

export async function findByTags(tags: string[] = [], take = 10, after?: DocumentSnapshot) {
    const queryConstraints = [
        limit(take)
    ];
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    for (const tag of tags) {
        queryConstraints.push(
            where(tag, '==', true)
        )
    }
    return _findByQuery(queryConstraints);
}

export async function findByUser(userId: UserID, tags: string[] = [], take = 10, after?: DocumentSnapshot) {
    const queryConstraints = [
        where('members', 'array-contains', userId),
        limit(take)
    ];
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    for (const tag of tags) {
        queryConstraints.push(
            where(tag, '==', true)
        )
    }
    return _findByQuery(queryConstraints);
}


async function _findByQuery(queryConstraints: QueryConstraint[]) {
    const q = query(_collectionRef(), ...queryConstraints);
    const docs = await getDocs(q).then(response => response.docs);
    return {
        // @ts-ignore
        channels: docs.map(docWithId).map(doc => channelRecordToChannel(doc, doc.id)),
        next: docs[docs.length - 1],
    };
}
