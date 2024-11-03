// src/__tests__/checkout.test.ts

import { Checkout } from "../services/checkout";
import { Inventory } from "../repositories/inventory";
import { PricingRulesList } from "../repositories/pricing-rules-list";
import fs from "fs";
import path from "path";
import { PricingRule } from "../entities/pricing-rule";

// Mocking the fs module
jest.mock("fs");

// Mock data for SKUs in JSON format
const mockInventoryData = JSON.stringify([
  { id: "atv", name: "Apple TV", price: 109.5 },
  { id: "ipd", name: "Super iPad", price: 549.99 },
  { id: "mbp", name: "MacBook Pro", price: 1399.99 },
  { id: "vga", name: "VGA adapter", price: 30.0 },
]);

// Mock fs readFileSync to return the mock data
jest.mock("fs");
(fs.readFileSync as jest.Mock).mockReturnValue(mockInventoryData);

describe("Checkout", () => {
  let checkout: Checkout;
  const pricingRulesList = new PricingRulesList([
    new PricingRule("atv", "discount", { quantity: 3, discountedQuantity: 2 }),
    new PricingRule("ipd", "reducedPrice", { quantity: 4, bulkPrice: 499.99 }),
  ]);

  beforeEach(() => {
    checkout = new Checkout(pricingRulesList);
  });
  test("should calculate total with no items", () => {
    const total = checkout.total();
    expect(total).toBe("0.00");
  });

  test("should calculate total with scanned items", () => {
    checkout.scan("ipd");
    checkout.scan("atv");
    const total = checkout.total();
    expect(total).toMatchSnapshot(); // Total without discount
  });

  test("should apply discount correctly for scanned items", () => {
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv"); // Apply 3 for 2 discount
    const total = checkout.total();
    expect(total).toMatchSnapshot(); // Only pay for 2 Apple TVs
  });
});
