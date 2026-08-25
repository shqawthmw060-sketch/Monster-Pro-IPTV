import { describe, expect, it } from "vitest";
import { toUserError } from "./apiError";

describe("toUserError", () => {
  it("uses a plain API error message", () => {
    expect(toUserError({ code: "AUTH_FAILED", message: "Invalid credentials" }, "Fallback")).toBe("Invalid credentials");
  });

  it("unwraps nested API errors", () => {
    expect(toUserError({ error: { code: "NETWORK", message: "Service unavailable" } }, "Fallback")).toBe("Service unavailable");
  });

  it("never returns an object for unknown values", () => {
    expect(toUserError({ code: "UNKNOWN" }, "Fallback")).toBe("UNKNOWN: Fallback");
    expect(toUserError(null, "Fallback")).toBe("Fallback");
  });
});
