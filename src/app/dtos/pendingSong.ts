import {Track} from './track';
import {User} from './user';

export interface PendingSong {
	track: Track;
	chosenBy: User[];
	score: number;
}