/**
 * Shared context for cross-step data in Cucumber scenarios.
 */
export const scenarioContext: {
  registeredEmail?: string;
  registeredPassword?: string;
  [key: string]: unknown;
} = {};

export function clearContext(): void {
  scenarioContext.registeredEmail = undefined;
  scenarioContext.registeredPassword = undefined;
}
