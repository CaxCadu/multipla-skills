import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/** Stable error codes. See docs/mcp-server.md#errors. */
export type ErrorCode = "unknown_skill" | "unknown_reference";

export class MultiplaError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "MultiplaError";
  }
}

export function errorResult(err: unknown): CallToolResult {
  const error =
    err instanceof MultiplaError
      ? { code: err.code, message: err.message }
      : { code: "internal_error", message: err instanceof Error ? err.message : String(err) };
  return {
    isError: true,
    content: [{ type: "text", text: JSON.stringify({ error }) }],
    structuredContent: { error },
  };
}

export function okResult(data: Record<string, unknown>): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data };
}
