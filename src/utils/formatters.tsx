/**
 * Formats a numerical value in cents to a US Dollar String.
 * @param  {number} valueInCents    Number representing the value in cents
 * @return {string}                 String Locale formatted for US Dollar
 * @function
 */
export const formatCentsToDollar = (valueInCents: number): string =>
    (valueInCents / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

/**
 * Formats a numerical value as a signed decimal.
 * @param  {number} percentValue    Number representing percent
 * @return {string}                 String Locale formatted for signed decimal
 * @function
 */
export const formatPercent = (percentValue: number): string =>
    percentValue.toLocaleString('en-US', {
        signDisplay: 'exceptZero',
        style: 'decimal',
    });

/**
 * Calculates savings cost and formats to a US Dollar String.
 * @param  {number} cost    Number representing the cost in cents
 * @param  {number} value   Number representing the value in cents
 * @return {string}         String Locale formatted for US Dollar
 * @function
 */
export const calculateSavings = (cost: number, value: number): string =>
    (value / 100 - cost / 100).toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });
