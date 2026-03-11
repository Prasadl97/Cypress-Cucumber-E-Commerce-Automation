import type { DefaultRegistrationData, ShopCartData, AdminData, TestData } from './TestDataSchema';

// Static import for Cypress (browser context) - no Node.js fs
import testDataJson from '../data/test-data.json';

/**
 * Loads test data. In Cypress context, uses static JSON import.
 */
export class TestDataLoader {
  static load(): TestData {
    return testDataJson as unknown as TestData;
  }
}

export type { DefaultRegistrationData, ShopCartData, AdminData, TestData };
