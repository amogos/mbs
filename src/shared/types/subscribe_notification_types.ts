import { UserRecordType } from './user_types';
import { SpaceType } from '../types';

export interface SubscribeNotificationType {
    user: UserRecordType;
    space: SpaceType;
}
