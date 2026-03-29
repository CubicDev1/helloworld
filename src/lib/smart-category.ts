import { GroceryCategory } from "@/store/grocery-store";

export const getSmartCategory = (itemName: string): GroceryCategory => {
  if (!itemName) return "Pantry";
  const lower = itemName.toLowerCase();

  const dairyKeywords = /milk|cheese|butter|yogurt|cream|ghee|paneer/;
  const produceKeywords = /apple|banana|fruit|veg|carrot|potato|orange|onion|tomato|spinach|berry|lettuce|garlic|lemon|lime|melon/;
  const bakeryKeywords = /bread|cake|muffin|croissant|bagel|bun|pastry|pie|loaf/;
  const snacksKeywords = /chip|chocolate|cookie|candy|snack|popcorn|cracker|biscuit|nut|pretzel/;

  // Check matching categories based on user's input string
  if (dairyKeywords.test(lower)) return "Dairy";
  if (produceKeywords.test(lower)) return "Produce";
  if (bakeryKeywords.test(lower)) return "Bakery";
  if (snacksKeywords.test(lower)) return "Snacks";
  
  // Anything that doesn't fit typically falls into pantry generics
  // Rice, sugar, salt, oil, pasta, spices, etc.
  return "Pantry";
};
