export const PAGE_PRODUCTS = 10;
export function discountPrice(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100));
}
