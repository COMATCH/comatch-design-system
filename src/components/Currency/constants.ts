import { CurrencyType, FieldValue } from './types';

const DEFAULT_VALUE: FieldValue = { currency: 'EUR', value: 0 };

const OPTIONS: { label: CurrencyType; symbol: string }[] = [
    { label: 'EUR', symbol: '&#128;' },
    { label: 'CHF', symbol: '&#8355;' },
    { label: 'GBP', symbol: '&#163;' },
    { label: 'USD', symbol: '&#36;' },
];

export { DEFAULT_VALUE, OPTIONS };
