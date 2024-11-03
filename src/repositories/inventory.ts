// src/entities/Inventory.ts

import { SKU } from "../entities/sku";
import * as fs from "fs";

export class Inventory {
  private skuMap: Map<string, SKU>;
  private static instance: Inventory | null = null;

  private constructor(skus: SKU[]) {
    this.skuMap = new Map(skus.map((sku) => [sku.id, sku]));
  }

  static getInstance(filePath: string): Inventory {
    if (!Inventory.instance) {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const skuData = JSON.parse(rawData) as {
        id: string;
        name: string;
        price: number;
      }[];

      const skus = skuData.map(
        (item) => new SKU(item.id, item.name, item.price)
      );
      Inventory.instance = new Inventory(skus);
    }
    return Inventory.instance;
  }

  getPrice(skuId: string): number {
    const sku = this.skuMap.get(skuId);
    if (!sku) throw new Error(`SKU not found: ${skuId}`);
    return sku.price;
  }
}
