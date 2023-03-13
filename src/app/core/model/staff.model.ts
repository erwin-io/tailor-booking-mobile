import { Gender } from './gender.model';
import { User } from './user.model';

export class Staff {
  staffIdd: string;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  gender: Gender;
  user: User;
}
