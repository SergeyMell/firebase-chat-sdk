import { _docRef } from './channel-collection';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { ChannelID, IChannel } from './channel.interface';
import { UserID } from '../user/user.interface';

export async function addUserToChannel(channelId: ChannelID, userId: UserID): Promise<void> {
    await updateDoc(_docRef(channelId), {
        members: arrayUnion(userId)
    });
}

export async function removeUserFromChannel(channelId: ChannelID, userId: UserID): Promise<void> {
    await updateDoc(_docRef(channelId), {
        members: arrayRemove(userId)
    });
}

export async function updateChannel(channelId: ChannelID, payload: string): Promise<void> {
    await updateDoc(_docRef(channelId), {
        payload
    });
}
