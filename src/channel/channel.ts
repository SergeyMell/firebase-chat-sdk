import { _docRef, batchRef } from './channel-collection';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { ChannelID } from './channel.interface';
import { UserID } from '../user/user.interface';
import { _userDocRef } from '../user/user-collection';

export async function addUserToChannel(channelId: ChannelID, userId: UserID): Promise<void> {
    const batch = batchRef();

    batch.update(_docRef(channelId), {
      members: arrayUnion(userId)
    });
    batch.update(_userDocRef(userId), {
      userChannels: arrayUnion(channelId)
    });

    await batch.commit();
}

export async function removeUserFromChannel(channelId: ChannelID, userId: UserID): Promise<void> {
    const batch = batchRef();

    batch.update(_docRef(channelId), {
      members: arrayRemove(userId)
    });
    batch.update(_userDocRef(userId), {
      userChannels: arrayRemove(channelId)
    });

    await batch.commit();
}

export async function updateChannel(channelId: ChannelID, payload: string, updatedAt?: number): Promise<void> {
    const data = updatedAt ? { payload, updatedAt } : { payload };
    await updateDoc(_docRef(channelId), data);
}
