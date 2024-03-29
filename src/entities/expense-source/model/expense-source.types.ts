import { MoneyVO } from '@/shared/lib';

export type ExpenseSource = {
  id: string;
  name: string;
  balance: MoneyVO;
  color?: string;
};
