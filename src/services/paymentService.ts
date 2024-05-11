import apiRequestService from './apiRequestService';
import { CreatePaymentDto } from '../types/paymentTypes';


const VITE_PAYMENT_SERVICE_BASE_URL = import.meta.env
  .VITE_PAYMENT_SERVICE_BASE_URL;


export const createPayment = (content: CreatePaymentDto) => {
    try {
      const response = apiRequestService.sendRequest(
        `${VITE_PAYMENT_SERVICE_BASE_URL}/payments`,
        'post',
        {},
        {},
        content
      );
      return response;
    } catch (err) {
      console.error(err);
    }
  };