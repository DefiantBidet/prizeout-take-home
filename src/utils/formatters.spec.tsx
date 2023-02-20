import '@testing-library/jest-dom';
import { formatCentsToDollar, formatPercent, calculateSavings } from 'Utils/formatters';

describe('Test Utils/Formatters', () => {
    test('formatCentsToDollar properly formats the string', () => {
        const oneDollar = 100;
        const tenDollars = 100 * 10;
        const treeFitty = 350;

        expect(formatCentsToDollar(oneDollar)).toBe('$1.00');
        expect(formatCentsToDollar(tenDollars)).toBe('$10.00');
        expect(formatCentsToDollar(treeFitty)).toBe('$3.50');
    });

    test('formatPercent properly formats string', () => {
        const percent1 = 2.04;
        const percent2 = 5.0;
        const percent3 = 0;

        expect(formatPercent(percent1)).toBe('+2.04');
        expect(formatPercent(percent2)).toBe('+5');
        expect(formatPercent(percent3)).toBe('0');
    });

    test('calculateSavings properly formats string', () => {
        const mock1 = {
            cost: 950,
            value: 1000,
        };

        const mock2 = {
            cost: 500,
            value: 1000,
        };

        const mock3 = {
            cost: 25,
            value: 100,
        };

        expect(calculateSavings(mock1.cost, mock1.value)).toBe('$0.50');
        expect(calculateSavings(mock2.cost, mock2.value)).toBe('$5.00');
        expect(calculateSavings(mock3.cost, mock3.value)).toBe('$0.75');
    });
});
