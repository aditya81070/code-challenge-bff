import { PricingRule } from "../entities/pricing-rule";

describe("PricingRule", () => {
  test("should throw error for invalid discount rule definition", () => {
    expect(() => {
      new PricingRule("atv", "discount", { quantity: 3 }); // missing discountedQuantity
    }).toThrow(
      'Invalid definition for discount rule on SKU atv. Expected "quantity" and "discountedQuantity" to be numbers.'
    );

    expect(() => {
      new PricingRule("atv", "discount", { discountedQuantity: 2 }); // missing quantity
    }).toThrow(
      'Invalid definition for discount rule on SKU atv. Expected "quantity" and "discountedQuantity" to be numbers.'
    );
  });

  test("should throw error for invalid reduced price rule definition", () => {
    expect(() => {
      new PricingRule("ipd", "reducedPrice", { quantity: 5 }); // missing bulkPrice
    }).toThrow(
      'Invalid definition for reduced price rule on SKU ipd. Expected "quantity" and "bulkPrice" to be numbers.'
    );

    expect(() => {
      new PricingRule("ipd", "reducedPrice", { bulkPrice: 499.99 }); // missing quantity
    }).toThrow(
      'Invalid definition for reduced price rule on SKU ipd. Expected "quantity" and "bulkPrice" to be numbers.'
    );
  });

  test("should apply discount rule correctly", () => {
    const rule = new PricingRule("atv", "discount", {
      quantity: 3,
      discountedQuantity: 2,
    });

    expect(rule.apply(3, 109.5)).toBe(219); // 3 for the price of 2
    expect(rule.apply(4, 109.5)).toBe(328.5); // 2 sets of 3 (2 * 109.50) + 1 at full price (1 * 109.50)
    expect(rule.apply(5, 109.5)).toBe(438); // 2 sets of 3 + 2 at full price
  });

  test("should apply reduced price rule correctly", () => {
    const rule = new PricingRule("ipd", "reducedPrice", {
      quantity: 4,
      bulkPrice: 499.99,
    });

    expect(rule.apply(4, 549.99)).toBe(1999.96); // 4 iPads at the bulk price
    expect(rule.apply(3, 549.99)).toBe(1649.97); // 3 at full price
  });
});
