import { MoneyVO } from '@/shared/lib';

export type MoneySource = {
  id: string;
  name: string;
  isDefault: boolean;
  balance: MoneyVO;
};
