// src/rules/PricingRulesList.ts

import { PricingRule } from "../entities/pricing-rule";

export class PricingRulesList {
  private rules: Map<string, PricingRule>;

  constructor(initialRules: PricingRule[] = []) {
    this.rules = new Map();
    initialRules.forEach((rule) => this.rules.set(rule.skuId, rule));
  }

  addRule(rule: PricingRule): void {
    this.rules.set(rule.skuId, rule);
  }

  removeRule(skuId: string): boolean {
    return this.rules.delete(skuId);
  }

  updateRule(skuId: string, newRule: PricingRule): void {
    if (this.rules.has(skuId)) {
      this.rules.set(skuId, newRule);
    } else {
      throw new Error(`Rule with SKU ID ${skuId} not found`);
    }
  }

  getRule(skuId: string): PricingRule | undefined {
    return this.rules.get(skuId);
  }

  getAllRules(): PricingRule[] {
    return Array.from(this.rules.values());
  }
}
