import { Track } from './track';

export interface CurrentSong {
	track: Track;
	offset_ms: number;
	startTime: string;
}