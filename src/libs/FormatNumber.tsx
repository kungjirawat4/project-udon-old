/* eslint-disable tailwindcss/no-custom-classname */
import { currency } from './currency';
import { numberFormat } from './numberFormat';

export const FormatNumber = ({
  value,
  isCurrency,
}: {
  value: number;
  isCurrency: boolean;
}) => {
  const isN = typeof value === 'number' && !Number.isNaN(value);

  return isN
    ? (
        isCurrency
          ? (
              <span>{currency(value)}</span>
            )
          : (
              <span>{numberFormat(value)}</span>
            )
      )
    : (
        <span className="loading loading-bars loading-xs"></span>
      );
};
