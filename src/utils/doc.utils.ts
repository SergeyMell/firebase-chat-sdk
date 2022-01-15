import { DocumentSnapshot } from 'firebase/firestore';

export function docWithId<T>(d: DocumentSnapshot): T {
    return Object.assign({id: d.id}, <T>d.data());
}
