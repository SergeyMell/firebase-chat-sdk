import { getFirestore } from 'firebase/firestore';

export abstract class BaseEntity {
    protected db = getFirestore();
}
