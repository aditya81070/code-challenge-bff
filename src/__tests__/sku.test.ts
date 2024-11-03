import { SKU } from "../entities/sku";

describe("SKU", () => {
  test("should create a SKU with correct properties", () => {
    const sku = new SKU("ipd", "Super iPad", 549.99);
    expect(sku.id).toBe("ipd");
    expect(sku.name).toBe("Super iPad");
    expect(sku.price).toBe(549.99);
  });
});
