// src/services/Checkout.ts

import { Inventory } from "../repositories/inventory";
import { PricingRulesList } from "../repositories/pricing-rules-list";

const skusPath = "src/data/skus.json";
export class Checkout {
  private itemCounts: Map<string, number>;

  constructor(private pricingRulesList: PricingRulesList) {
    this.itemCounts = new Map();
  }

  scan(skuId: string): void {
    this.itemCounts.set(skuId, (this.itemCounts.get(skuId) || 0) + 1);
  }

  total(): string {
    let total = 0;

    for (const [skuId, count] of this.itemCounts.entries()) {
      const price = Inventory.getInstance(skusPath).getPrice(skuId);
      const rule = this.pricingRulesList.getRule(skuId);

      if (rule) {
        total += rule.apply(count, price);
      } else {
        total += count * price; // Regular price if no rule applies
      }
    }

    return `${total.toFixed(2)}`;
  }
}
