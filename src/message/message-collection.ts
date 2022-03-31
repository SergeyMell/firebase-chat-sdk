import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentReference,
    DocumentSnapshot,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    startAfter,
    setDoc,
} from 'firebase/firestore';
import {IMessage, IMessageData, IMessageRecord, MessageID} from './message.interface';
import { ChannelID } from '../channel/channel.interface';
import { UserID } from '../user/user.interface';
import { docWithId } from '../_utils/firebase-snapshot.utils';

function _collectionPath(channelId: ChannelID): string {
    return `/channels/${channelId}/messages`;
}

function _docRef(channelId: ChannelID, messageId: string): DocumentReference {
    const db = getFirestore();
    return doc(db, `${_collectionPath(channelId)}/${messageId}`);
}

function _collectionRef(channelId: ChannelID): CollectionReference {
    const db = getFirestore();
    return collection(db, _collectionPath(channelId));
}

function _messageRef(channelId: ChannelID, messageId: MessageID): DocumentReference {
    const db = getFirestore();
    return doc(db, `${_collectionPath(channelId)}/${messageId}`);
}

function messageRecordToChannel(record: IMessageRecord, id: string): IMessage {
    let payload = null;_collectionRef
    try {
        payload = JSON.parse(record.payload || 'null');
    } catch {
    }
    return {
        id: id,
        message: record.message,
        payload: payload,
        createdAt: record.createdAt,
        sender: record.sender,
    };
}

export async function postMessage(channel: ChannelID, sender: UserID, data: IMessageData): Promise<IMessage> {
    // TODO: Check if channel exists
    // TODO: Check if sender is a channel member
    const message: IMessageRecord = {
        message: data.message,
        payload: JSON.stringify(data.payload || null),
        sender: sender,
        createdAt: Date.now(),
    };
    const newDoc = await addDoc(_collectionRef(channel), message);
    return messageRecordToChannel(message, newDoc.id);
}

export async function getMessages(channel: ChannelID, take: number = 10, after?: DocumentSnapshot) {
    const queryConstraints = [
        limit(take),
        orderBy('createdAt', 'desc')
    ];
    if (after) {
        queryConstraints.push(startAfter(after));
    }
    const q = query(_collectionRef(channel), ...queryConstraints);
    const docs = await getDocs(q).then(response => response.docs);
    return {
        // @ts-ignore
        messages: docs.map(docWithId).map(doc => messageRecordToChannel(doc, doc.id)),
        next: docs[docs.length - 1],
    };
}

export async function updateMessage(channelId: ChannelID, messageId: MessageID, sender: UserID, data: IMessageData): Promise<IMessage> {
    const message: IMessageRecord = {
        message: data.message,
        payload: JSON.stringify(data.payload || null),
        sender: sender,
        createdAt: Date.now(),
    };
    await setDoc(_messageRef(channelId, messageId), message);
    return messageRecordToChannel(message, messageId);
}
