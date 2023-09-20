export const getDiscount = (original_price, price) => {
    return Math.round((original_price - price) / original_price * 100);
};