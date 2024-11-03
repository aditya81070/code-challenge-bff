import { PricingRule } from "./entities/pricing-rule";
import { PricingRulesList } from "./repositories/pricing-rules-list";
import { Checkout } from "./services/checkout";

const pricingRulesList = new PricingRulesList([
  new PricingRule("atv", "discount", { quantity: 3, discountedQuantity: 2 }),
  new PricingRule("ipd", "reducedPrice", { quantity: 4, bulkPrice: 499.99 }),
]);

const co1 = new Checkout(pricingRulesList);
co1.scan("atv");
co1.scan("atv");
co1.scan("atv");
co1.scan("vga");
console.log(`Total: ${co1.total()}`);

const co2 = new Checkout(pricingRulesList);
co2.scan("ipd");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("ipd");
co2.scan("atv");
co2.scan("atv");
co2.scan("atv");
console.log(`Total: $${co2.total()}`);
