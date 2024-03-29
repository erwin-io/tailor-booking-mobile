import { Customer } from './customer.model';
import { EntityStatus } from './entity-status.model';
import { Staff } from './staff.model';

export class Reservation {
  reservationId: string;
  reservationCode: string;
  reqCompletionDate: string;
  estCompletionDate: string;
  description: string;
  isCancelledByAdmin: boolean;
  adminRemarks: string;
  reservationLevel: ReservationLevel;
  customer: Customer;
  orderItems: OrderItem[] = [];
  reservationStatus: ReservationStatus;
  staff: Staff;
  submitItemsBeforeDateTime: Date;
  toPickupDateTime: Date;
  reasonToDecline: string;
}

export class ReservationStatus {
  reservationStatusId: string;
  name: string;
}

export class ReservationLevel {
  reservationLevelId: string;
  name: string;
}

export class OrderItem {
  orderItemId: string;
  quantity: number;
  remarks: string;
  orderItemType: OrderItemType;
  reservation: Reservation;
  entityStatus: EntityStatus;
  orderItemAttachments: any[];
}

export class OrderItemType {
  orderItemTypeId: string;
  name: string;
}