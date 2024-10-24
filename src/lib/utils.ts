export const getDiscountedPricePercentage = (
  originalPrice: number,
  discountedPrice: number
): number => {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return parseFloat(discountPercentage.toFixed(2));
};

export const replaceHyphensWithSpaces = (text: string): string => {
  return text.replace(/-/g, " ");
};
