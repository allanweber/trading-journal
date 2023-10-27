'use client';

import { trpc } from '@/app/_trpc/client';
import Loading from '@/components/Loading';
import { MessageDisplay } from '@/components/MessageDisplay';
import { EntryType } from '@/model/entryType';
import DepositForm from '../components/DepositForm';
import DividendForm from '../components/DividendForm';
import TaxesForm from '../components/TaxesForm';
import TradeForm from '../components/TradeForm';
import WithdrawalForm from '../components/WithdrawalForm';

const EntryForm = ({
  entryType,
  entryId,
}: {
  entryType: EntryType;
  entryId: string;
}) => {
  switch (entryType) {
    case EntryType.Trade:
      return <TradeForm tradeId={entryId} />;
    case EntryType.Withdrawal:
      return <WithdrawalForm withdrawalId={entryId} />;
    case EntryType.Deposit:
      return <DepositForm depositId={entryId} />;
    case EntryType.Taxes:
      return <TaxesForm taxesId={entryId} />;
    case EntryType.Dividend:
      return <DividendForm dividendId={entryId} />;
    default:
      throw new Error(`Invalid entry type: ${entryType}`);
  }
};

export default function Page({ params }: { params: { entryId: string } }) {
  const {
    data: entryType,
    isSuccess,
    error,
  } = trpc.entry.entryType.useQuery(params.entryId);

  if (error) {
    return <MessageDisplay message={error} variant="destructive" />;
  }

  if (isSuccess) {
    return <EntryForm entryType={entryType} entryId={params.entryId} />;
  }

  return <Loading />;
}
