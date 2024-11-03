import { Inventory } from "../repositories/inventory";
import fs from "fs";
import path from "path";

// Mocking the fs module
jest.mock("fs");

describe("Inventory", () => {
  let inventory: Inventory;

  beforeEach(() => {
    // Mock data to return
    const mockData = JSON.stringify([
      { id: "ipd", name: "Super iPad", price: 549.99 },
      { id: "mbp", name: "MacBook Pro", price: 1399.99 },
      { id: "atv", name: "Apple TV", price: 109.5 },
      { id: "vga", name: "VGA adapter", price: 30.0 },
    ]);

    // Mock the readFileSync function to return the mock data
    (fs.readFileSync as jest.Mock).mockReturnValue(mockData);

    // Initialize inventory using the mocked data
    inventory = Inventory.getInstance(
      path.join(__dirname, "../data/skus.json")
    );
  });

  test("should return price of given sku", () => {
    const ipadPrice = inventory.getPrice("ipd");
    expect(ipadPrice).toBe(549.99);
  });
  test("should throw error for invalid sku", () => {
    expect(() => {
      inventory.getPrice("invalid");
    }).toThrow("SKU not found: invalid");
  });
});
