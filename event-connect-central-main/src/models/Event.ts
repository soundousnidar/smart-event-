
export interface Event {
  id?: number;
  title: string;
  description: string;
  date: Date | string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  image?: string | null;
}
