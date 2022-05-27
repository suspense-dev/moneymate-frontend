import { computed, makeObservable } from 'mobx';
import { addMinutes, format } from 'date-fns';

import { Transaction, TransactionModel } from '@/entities/transaction';

export class _TransactionsPageModel {
  constructor() {
    makeObservable(this, {
      txnsGroupedByDate: computed,
    });
  }

  get txnsGroupedByDate(): Record<string, Transaction[]> {
    const result: Record<string, Transaction[]> = {};

    TransactionModel.all.forEach((txn: Transaction) => {
      const createdAtWithOffset = new Date(txn.createdAt);
      const formattedCreatedAt = format(
        addMinutes(createdAtWithOffset, createdAtWithOffset.getTimezoneOffset()),
        'dd.MM.yyyy',
      );

      if (result[formattedCreatedAt]) {
        result[formattedCreatedAt].push(txn);
      } else {
        result[formattedCreatedAt] = [txn];
      }
    });

    return result;
  }
}

export const TransactionsPageModel = new _TransactionsPageModel();
