export interface GetConfigOptions {
  projectId: string;
  env: string;
  apiKey: string;
  version?: number;
  fallback?: Record<string, any>;
  bypassCache?: boolean;
}

export async function getConfig({
  projectId,
  env,
  apiKey,
  version,
  fallback = {},
  bypassCache = false,
}: GetConfigOptions): Promise<Record<string, any>> {
  const url = new URL("https://togglit.vercel.app/api/public/config");
  url.searchParams.append("projectId", projectId);
  url.searchParams.append("env", env);

  if (version) {
    url.searchParams.append("version", version.toString());
  }

  // Smart caching logic that matches your API
  const isProduction = env === "production" || env === "prod";
  const shouldSkipCache = !isProduction || bypassCache;

  if (shouldSkipCache) {
    url.searchParams.append("nocache", "true");
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Add cache control header
  if (bypassCache) {
    headers["X-Cache-Control"] = "no-cache";
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      cache: shouldSkipCache ? "no-store" : "default",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch config: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    return data.config || data;
  } catch (error) {
    console.warn("Togglit fallback config used due to error:", error);
    return fallback;
  }
}
