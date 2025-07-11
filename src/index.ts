export interface GetConfigOptions {
  projectId: string;
  env: string;
  apiKey: string;
  version?: number;
  fallback?: Record<string, any>;
}

export async function getConfig({
  projectId,
  env,
  apiKey,
  version,
  fallback = {},
}: GetConfigOptions): Promise<Record<string, any>> {
  const url = new URL("https://togglit.dev/api/config");
  url.searchParams.append("projectId", projectId);
  url.searchParams.append("env", env);
  if (version) {
    url.searchParams.append("version", version.toString());
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch config");
    }

    const data = await res.json();
    return data.config ?? fallback;
  } catch (error) {
    console.warn("Togglit fallback config used due to error:", error);
    return fallback;
  }
}
