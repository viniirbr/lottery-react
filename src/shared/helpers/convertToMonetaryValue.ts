export function convertToMonetaryValue(monetaryValue: number): string {
    return monetaryValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}