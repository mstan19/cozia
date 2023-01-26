export function calculateDiscountPrice(price, discount) {
    return (price - price * (discount / 100)).toFixed(2);
};

export function sortDateDesc(array) {
    array.sort((a , b) => a.createdAt > b.createdAt ? -1 : 1);
};

export function sortDiscountDesc(array) {
    array.sort((a , b) => a.discount > b.discount ? -1 : 1);
}
