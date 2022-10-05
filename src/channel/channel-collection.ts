import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit, onSnapshot,
  query,
  QueryConstraint,
  setDoc,
  startAfter,
  where,
  QuerySnapshot,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { ChannelID, IChannel, IChannelData, IChannelRecord } from './channel.interface';
import { docWithId } from '../_utils/firebase-snapshot.utils';
import { UserID } from '../user/user.interface';
import { arrayToObject, objectToArray } from '../_utils/array.utils';
import firebase from 'firebase/compat';
import Unsubscribe = firebase.Unsubscribe;
import { WriteBatch } from '@firebase/firestore';

const _collectionPath = '/channels';

function _collectionRef(): CollectionReference {
    const db = getFirestore();
    return collection(db, _collectionPath);
}

export function _docRef(id: ChannelID): DocumentReference {
    const db = getFirestore();
    return doc(db, `${_collectionPath}/${id}`);
}

export function batchRef(): WriteBatch {
  const db = getFirestore();
  return writeBatch(db);
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
        members: record.members,
    };
}

export async function createChannel(id: ChannelID, data: IChannelData): Promise<IChannel> {
    // TODO: Check if channel already exists
    const tags = arrayToObject(data.tags);
    const channel: IChannelRecord = {
        title: data.title,
        payload: JSON.stringify(data.payload || null),
        tags,
        members: [],
        updatedAt: Date.now(),
    };
    await setDoc(_docRef(id), channel);
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

export async function findChannelsByTags(tags: string[] = [], take = 10, sortByLastUpdate = false, after?: DocumentSnapshot) {
    const queryConstraints = [
        limit(take),
    ];
    if (sortByLastUpdate) {
        queryConstraints.push(
            orderBy('updatedAt', 'desc')
        );
    }
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    for (const tag of tags) {
        queryConstraints.push(
            where(`tags.${tag}`, '==', true)
        )
    }
    return _findByQuery(queryConstraints);
}

export async function findChannelsByUser(userId: UserID, tags: string[] = [], take = 10, sortByLastUpdate = false, after?: DocumentSnapshot) {
    const queryConstraints = [
        where('members', 'array-contains', userId),
        limit(take),
    ];
    if (sortByLastUpdate) {
        queryConstraints.push(
            orderBy('updatedAt', 'desc')
        );
    }
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    for (const tag of tags) {
        queryConstraints.push(
            where(`tags.${tag}`, '==', true)
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

export async function subscribeChannels(callback: (channels: IChannel[], channelData: QuerySnapshot) => void): Promise<Unsubscribe> {
    return onSnapshot(_collectionRef(), (channelData) => {
        let channels: IChannel[] = [];
        // Check that this is not the first snapshot request, but adding a new document to the listener
        if (channelData.docs.length !== channelData.docChanges().length) {
            // @ts-ignore
            channels = channelData.docChanges().map(docData => docData.doc).map(docWithId).map(doc => channelRecordToChannel(doc, doc.id));
        }
        callback(channels, channelData);
    });
}

export async function subscribeChannel(channelId: string, callback: (channelData: DocumentSnapshot) => void): Promise<Unsubscribe> {
  return onSnapshot(_docRef(channelId), (channelData) => {
    // let channels: IChannel[] = [];
    // // Check that this is not the first snapshot request, but adding a new document to the listener
    // if (channelData.docs.length !== channelData.docChanges().length) {
    //   // @ts-ignore
    //   channels = channelData.docChanges().map(docData => docData.doc).map(docWithId).map(doc => channelRecordToChannel(doc, doc.id));
    // }
    callback(channelData);
  });
}

export async function unsubscribeChannel(unsubscribe: Unsubscribe): Promise<void> {
    unsubscribe();
}
