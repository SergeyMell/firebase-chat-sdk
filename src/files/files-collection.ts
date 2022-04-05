import { ChannelID } from '../channel/channel.interface';
import {
    setDoc,
    doc,
    CollectionReference,
    DocumentSnapshot,
    getDocs,
    getFirestore,
    orderBy,
    query,
    startAfter, collection
} from 'firebase/firestore';
import { FileID, IFile } from './files.interface';
import { DocumentReference } from '@firebase/firestore';

function _collectionPath(channelId: ChannelID, fileId: FileID): string {
    return `/channels/${channelId}/files/${fileId}`;
}

function _docRef(channelId: ChannelID, fileId: FileID): DocumentReference {
    const db = getFirestore();
    return doc(db, _collectionPath(channelId, fileId));
}

function _collectionRef(channelId: ChannelID): CollectionReference {
    const db = getFirestore();
    return collection(db, _collectionPath(channelId, ''));
}

export async function postFile(channelId: ChannelID, fileId: FileID,  file: IFile): Promise<IFile> {
    await setDoc(_docRef(channelId, fileId), file);
    return file;
}

export async function getFiles(channelId: ChannelID, after?: DocumentSnapshot) {
    const queryConstraints = [
        orderBy('createdAt', 'desc')
    ];
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    const q = query(_collectionRef(channelId), ...queryConstraints);
    return await getDocs(q).then(response => response.docs);
}
