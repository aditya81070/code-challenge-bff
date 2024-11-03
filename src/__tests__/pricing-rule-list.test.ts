// src/__tests__/pricing-rules-list.test.ts

import { PricingRule } from "../entities/pricing-rule";
import { PricingRulesList } from "../repositories/pricing-rules-list";

describe("PricingRulesList", () => {
  let rulesList: PricingRulesList;
  const initialRules = [
    new PricingRule("atv", "discount", { quantity: 3, discountedQuantity: 2 }),
    new PricingRule("ipd", "reducedPrice", { quantity: 4, bulkPrice: 499.99 }),
  ];

  beforeEach(() => {
    rulesList = new PricingRulesList(initialRules);
  });

  test("should initialize with initial rules", () => {
    expect(rulesList.getAllRules()).toHaveLength(2);
    expect(rulesList.getRule("atv")).toBeInstanceOf(PricingRule);
    expect(rulesList.getRule("ipd")).toBeInstanceOf(PricingRule);
  });

  test("should add a new rule", () => {
    const newRule = new PricingRule("mbp", "discount", {
      quantity: 2,
      discountedQuantity: 1,
    });
    rulesList.addRule(newRule);

    expect(rulesList.getAllRules()).toHaveLength(3);
    expect(rulesList.getRule("mbp")).toBe(newRule);
  });

  test("should remove a rule", () => {
    const wasRemoved = rulesList.removeRule("atv");
    expect(wasRemoved).toBe(true);
    expect(rulesList.getAllRules()).toHaveLength(1);
    expect(rulesList.getRule("atv")).toBeUndefined();
  });

  test("should return false when trying to remove a non-existent rule", () => {
    const wasRemoved = rulesList.removeRule("nonexistent");
    expect(wasRemoved).toBe(false);
    expect(rulesList.getAllRules()).toHaveLength(2); // Initial rules still present
  });

  test("should update an existing rule", () => {
    const updatedRule = new PricingRule("atv", "discount", {
      quantity: 5,
      discountedQuantity: 3,
    });
    rulesList.updateRule("atv", updatedRule);

    const retrievedRule = rulesList.getRule("atv");
    expect(retrievedRule).toBe(updatedRule);
    expect(retrievedRule?.definition.quantity).toBe(5);
    expect(retrievedRule?.definition.discountedQuantity).toBe(3);
  });

  test("should throw an error when updating a non-existent rule", () => {
    const nonExistentRule = new PricingRule("mbp", "discount", {
      quantity: 2,
      discountedQuantity: 1,
    });

    expect(() => rulesList.updateRule("nonexistent", nonExistentRule)).toThrow(
      "Rule with SKU ID nonexistent not found"
    );
  });

  test("should retrieve a specific rule", () => {
    const retrievedRule = rulesList.getRule("ipd");
    expect(retrievedRule).toBeInstanceOf(PricingRule);
    expect(retrievedRule?.skuId).toBe("ipd");
    expect(retrievedRule?.definition.quantity).toBe(4);
    expect(retrievedRule?.definition.bulkPrice).toBe(499.99);
  });

  test("should return undefined for a non-existent rule", () => {
    const retrievedRule = rulesList.getRule("nonexistent");
    expect(retrievedRule).toBeUndefined();
  });

  test("should retrieve all rules", () => {
    const allRules = rulesList.getAllRules();
    expect(allRules).toHaveLength(2);
    expect(allRules[0]).toBeInstanceOf(PricingRule);
    expect(allRules[1]).toBeInstanceOf(PricingRule);
  });
});
