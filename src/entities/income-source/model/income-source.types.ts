import { MoneyVO } from '@/shared/lib';

export type IncomeSource = {
  id: string;
  name: string;
  isDefault: boolean;
  balance: MoneyVO;
  color?: string;
};
