export function calculateSalePrice(price, sale) {
    return price - price * (sale / 100);
};

export function sortDateDesc(array) {
    array.sort((a , b) => a.createdAt > b.createdAt ? -1 : 1);
};
