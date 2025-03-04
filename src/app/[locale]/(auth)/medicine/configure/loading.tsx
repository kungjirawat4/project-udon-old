import { Shell } from '@/components/common/shell';
import { DataTableLoading } from '@/components/data-tables/data-table-skeleton';

export default function IndexLoading() {
  return (
    <Shell>
      <DataTableLoading columnCount={5} />
    </Shell>
  );
}
