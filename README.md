# Computer Store Checkout System

## Overview

This document provides an overview of the entities, data flow, and commands for building and running the TypeScript-based checkout system for the computer store.

## Folder Structure

```
src
├── data
│   └── skus.json
├── entities
│   ├── pricing-rule.ts
│   └── sku.ts
├── main.ts
├── repositories
│   ├── inventory.ts
│   └── pricing-rules-list.ts
└── services
    └── checkout.ts
```

### Description of Each Folder

- **data**: Contains static data files, such as `skus.json`, which holds the inventory information in JSON format.

- **entities**: Contains TypeScript classes that define the core objects used in the system.

  - **pricing-rule.ts**: Defines the `PricingRule` class, which encapsulates the logic for various pricing strategies applicable to SKUs.
  - **sku.ts**: Defines the `SKU` class, which represents a stock-keeping unit, including attributes such as name and price.

- **main.ts**: The entry point of the application. This file initializes the necessary components, loads the inventory data, and sets up the checkout system.

- **repositories**: Contains classes that manage data operations related to the entities.

  - **inventory.ts**: Manages the inventory of SKUs, providing methods to fetch SKU data and handle inventory operations.
  - **pricing-rules-list.ts**: Manages a list of pricing rules, allowing for retrieval and updates of pricing strategies.

- **services**: Contains classes that provide business logic and operations.
  - **checkout.ts**: Implements the checkout logic, processing scanned items and applying pricing rules to calculate the total price.

## Data Flow

1. **Loading SKUs**: The application reads SKU data from `skus.json` in the `data` folder, which contains all available products and their prices.

2. **Creating Entities**: The SKU data is used to instantiate `SKU` objects in the `entities` folder.

3. **Applying Pricing Rules**: The `PricingRule` class in the `entities` folder defines various pricing strategies, such as bulk discounts or special offers, which are stored in `pricing-rules-list.ts`.

4. **Processing Checkout**: When a user scans items, the `Checkout` service uses the `Inventory` to fetch SKU details and applies relevant pricing rules to calculate the final total price.

5. **Output**: The final price is returned to the user, reflecting any discounts or promotions applied.

## Running Commands

### Development Mode

1. Install dependencies:

```bash
    yarn
```

2. To run the application in development mode using `ts-node` (which allows running TypeScript files directly):

```bash
    yarn dev
```

### Building the Project

To compile the TypeScript files into JavaScript and prepare for production:

```bash
    yarn build
```

This command will:

1. Remove the dist folder (if it exists).
2. Compile TypeScript files and output them to the dist folder.

### Production Mode

To run the compiled JavaScript files in production mode:

```bash
yarn prod
```
