import { _docRef } from './channel-collection';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { ChannelID } from './channel.interface';
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
