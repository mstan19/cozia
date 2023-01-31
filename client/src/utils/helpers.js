export function calculateDiscountPrice(price, discount) {
    return (price - price * (discount / 100)).toFixed(2);
};

export function sortDateDesc(array) {
    return array.sort((a , b) => a.createdAt > b.createdAt ? -1 : 1);
};

export function sortDiscountDesc(array) {
    return array.sort((a , b) => a.discount > b.discount ? -1 : 1);
}
