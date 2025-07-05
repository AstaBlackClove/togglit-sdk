# Togglit SDK

A lightweight TypeScript SDK for fetching configuration from Togglit with real-time updates and smart caching support.

## Installation

```bash
npm install togglit-sdk
```

```bash
yarn add togglit-sdk
```

```bash
pnpm add togglit-sdk
```

## Quick Start

```typescript
import { getConfig } from "togglit-sdk";

const config = await getConfig({
  apiKey: "your-api-key",
  projectId: "your-project-id",
  env: "production",
  version: 1,
});

console.log(config);
```

## API Reference

### `getConfig(options)`

Fetches configuration from Togglit with automatic fallback support and smart caching.

#### Parameters

| Parameter     | Type                  | Required | Description                                                |
| ------------- | --------------------- | -------- | ---------------------------------------------------------- |
| `apiKey`      | `string`              | ✅       | Your Togglit API key                                       |
| `projectId`   | `string`              | ✅       | Your project identifier                                    |
| `env`         | `string`              | ✅       | Environment name (e.g., 'production', 'development')       |
| `version`     | `number`              | ❌       | Specific configuration version to fetch                    |
| `fallback`    | `Record<string, any>` | ❌       | Fallback configuration object (default: `{}`)              |
| `bypassCache` | `boolean`             | ❌       | Force bypass cache and fetch fresh data (default: `false`) |

#### Returns

`Promise<Record<string, any>>` - The configuration object or fallback if request fails

#### Example

```typescript
import { getConfig } from "togglit-sdk";

// Basic usage
const config = await getConfig({
  apiKey: "tk_1234567890",
  projectId: "my-project",
  env: "production",
});

// With version and fallback
const config = await getConfig({
  apiKey: "tk_1234567890",
  projectId: "my-project",
  env: "production",
  version: 2,
  fallback: {
    feature_flag: false,
    api_url: "https://api.example.com",
  },
});

// Force fresh data (bypass cache)
const config = await getConfig({
  apiKey: "tk_1234567890",
  projectId: "my-project",
  env: "production",
  bypassCache: true,
});
```

## Features

- **Real-time Updates**: Fetch the latest configuration from Togglit
- **Smart Caching**: Intelligent caching that automatically disables cache for non-production environments
- **Cache Control**: Manual cache bypass option for when you need fresh data
- **Fallback Support**: Automatic fallback to default values on API failures
- **TypeScript Support**: Full TypeScript support with type definitions
- **Lightweight**: Minimal dependencies and small bundle size
- **Error Handling**: Graceful error handling with fallback configuration

## Smart Caching Behavior

The SDK includes intelligent caching logic:

- **Production environments** (`env: 'production'` or `env: 'prod'`): Uses caching by default for optimal performance
- **Non-production environments**: Automatically bypasses cache to ensure fresh configuration during development
- **Manual override**: Use `bypassCache: true` to force fresh data regardless of environment

```typescript
// Production - uses cache by default
const prodConfig = await getConfig({
  apiKey: "your-api-key",
  projectId: "my-project",
  env: "production", // Cache enabled
});

// Development - automatically bypasses cache
const devConfig = await getConfig({
  apiKey: "your-api-key",
  projectId: "my-project",
  env: "development", // Cache automatically bypassed
});

// Force fresh data in production
const freshConfig = await getConfig({
  apiKey: "your-api-key",
  projectId: "my-project",
  env: "production",
  bypassCache: true, // Force bypass cache
});
```

## Error Handling

The SDK includes built-in error handling. If the API request fails, it will:

1. Log a warning message to the console
2. Return the provided fallback configuration
3. Continue execution without throwing errors

```typescript
const config = await getConfig({
  apiKey: "invalid-key",
  projectId: "my-project",
  env: "production",
  fallback: {
    // These values will be used if the API call fails
    enableNewFeature: false,
    maxRetries: 3,
  },
});

// config will contain the fallback values if API fails
```

## Usage Examples

### Feature Flags

```typescript
const config = await getConfig({
  apiKey: process.env.TOGGLIT_API_KEY,
  projectId: "my-app",
  env: process.env.NODE_ENV,
  fallback: {
    enableBetaFeatures: false,
    showMaintenanceMode: false,
  },
});

if (config.enableBetaFeatures) {
  // Show beta features
}
```

### API Configuration

```typescript
const config = await getConfig({
  apiKey: process.env.TOGGLIT_API_KEY,
  projectId: "my-service",
  env: "production",
  fallback: {
    apiUrl: "https://api.fallback.com",
    timeout: 5000,
    retries: 3,
  },
});

const apiClient = new ApiClient({
  baseUrl: config.apiUrl,
  timeout: config.timeout,
  maxRetries: config.retries,
});
```

### Environment-Specific Configuration

```typescript
// Development - cache automatically bypassed
const devConfig = await getConfig({
  apiKey: "dev-api-key",
  projectId: "my-project",
  env: "development",
  fallback: { debugMode: true },
});

// Production - cache enabled
const prodConfig = await getConfig({
  apiKey: "prod-api-key",
  projectId: "my-project",
  env: "production",
  fallback: { debugMode: false },
});
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions:

```typescript
import { getConfig, GetConfigOptions } from "togglit-sdk";

const options: GetConfigOptions = {
  apiKey: "your-api-key",
  projectId: "your-project-id",
  env: "production",
  version: 1,
  fallback: {
    feature1: true,
    feature2: false,
  },
  bypassCache: false,
};

const config: Record<string, any> = await getConfig(options);
```

## License

MIT

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/AstaBlackClove/togglit-sdk) or contact our support team.

---

Made with ❤️ by the Togglit team
