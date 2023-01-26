export function calculateSalePrice(price, sale) {
    return (price - price * (sale / 100)).toFixed(2);
};

export function sortDateDesc(array) {
    array.sort((a , b) => a.createdAt > b.createdAt ? -1 : 1);
};

export function sortSalesDesc(array) {
    array.sort((a , b) => a.sale > b.sale ? -1 : 1);
}
