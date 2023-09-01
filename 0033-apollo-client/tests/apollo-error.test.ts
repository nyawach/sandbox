import { describe, it, expect } from "vitest";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";

describe("apollo-error.ts", () => {
  it("error", () => {
    const error = new ApolloError({
      graphQLErrors: [new GraphQLError("テスト")],
    });
    expect(error instanceof Error).toBe(true);
    expect(error instanceof GraphQLError).toBe(true);
    expect(error instanceof ApolloError).toBe(true);
  });
});
