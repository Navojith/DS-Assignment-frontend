import { v4 as uuidv4 } from 'uuid';

export const generateTraceId = (): string => uuidv4();
