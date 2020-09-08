import { User } from './user';

export class Photo {
  id: number;
  url: string;
  isMain: boolean;
  description: string;
  userId: number;
  user: User;
}