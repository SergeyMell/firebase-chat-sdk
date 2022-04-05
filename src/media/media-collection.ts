import {ChannelID} from '../channel/channel.interface';
import {
    addDoc,
    collection,
    CollectionReference,
    DocumentSnapshot,
    getDocs,
    getFirestore,
    orderBy,
    query,
    startAfter
} from 'firebase/firestore';
import { IMedia } from './media.interface';
import { DocumentReference } from '@firebase/firestore';

function _collectionPath(channelId: ChannelID): string {
    return `/channels/${channelId}/media`;
}

function _collectionRef(channelId: ChannelID): CollectionReference {
    const db = getFirestore();
    return collection(db, _collectionPath(channelId));
}

export async function postMedia(channelId: ChannelID, media: IMedia[]): Promise<DocumentReference> {
    return await addDoc(_collectionRef(channelId), media);
}

export async function getMedia(channelId: ChannelID, after?: DocumentSnapshot) {
    const queryConstraints = [
        orderBy('createdAt', 'desc')
    ];
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    const q = query(_collectionRef(channelId), ...queryConstraints);
    return await getDocs(q).then(response => response.docs);
}
