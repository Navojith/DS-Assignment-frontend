import { CreatePaymentDto } from '../types/paymentTypes';
import apiRequestService from './apiRequestService';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createPayment = (content: CreatePaymentDto) => {
  try {
    const response = apiRequestService.sendRequest(
      `${VITE_BASE_URL}/payments/`,
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
