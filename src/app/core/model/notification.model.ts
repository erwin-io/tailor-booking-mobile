import { Customer } from './customer.model';
import { Gender } from './gender.model';
import { Reservation } from './reservation.model';
import { User } from './user.model';

export class Notifications {
  notificationId: string;
  date: Date;
  title: string;
  description: any;
  isReminder: boolean;
  isRead: boolean;
  customer: Customer;
  reservation: Reservation;
}
