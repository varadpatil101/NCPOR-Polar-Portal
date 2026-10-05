import { describe, expect, it } from "vitest";
import { parseArchiveFilters } from "../src/server/repositories/archive-repository";

describe("archive discovery", () => {
  it("parses supported URL filters", () => {
    expect(parseArchiveFilters({ q: "ice", type: "datasets", region: "Antarctica", year: "2025", featured: "true", page: "2" })).toMatchObject({ query: "ice", type: "datasets", region: "Antarctica", year: 2025, featured: true, page: 2 });
  });
  it("drops unsupported URL values", () => {
    expect(parseArchiveFilters({ type: "Story", region: "Moon", year: "nope", page: "0" })).toMatchObject({ type: "all", page: 1 });
  });
});
