export interface CreatePaymentDto {
     timestamp?: Date;
     amount: number;
     status: string;
     paymentMethod: string;
     paymentId: string;
     userId: string;
     courseId: string;
}