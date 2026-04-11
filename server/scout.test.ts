import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM module so tests don't make real API calls
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("scout.chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a response from the LLM for a single user message", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "Heaps good question! The North route is your best bet for marine wildlife.",
          },
        },
      ],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.scout.chat({
      messages: [{ role: "user", content: "Which route is best for marine wildlife?" }],
    });

    expect(result.content).toBe("Heaps good question! The North route is your best bet for marine wildlife.");
    expect(mockInvokeLLM).toHaveBeenCalledOnce();
  });

  it("includes the correct system prompt with Lola's profile details", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [{ message: { content: "Scout response" } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.scout.chat({
      messages: [{ role: "user", content: "Tell me about Stormy" }],
    });

    const callArgs = mockInvokeLLM.mock.calls[0]?.[0];
    expect(callArgs).toBeDefined();
    const systemMessage = callArgs!.messages[0];
    expect(systemMessage.role).toBe("system");
    expect(typeof systemMessage.content).toBe("string");
    const systemContent = systemMessage.content as string;
    // Verify key Lola profile details are in the system prompt
    expect(systemContent).toContain("Lola Augspurger");
    expect(systemContent).toContain("James Cook University");
    expect(systemContent).toContain("Stormy");
    expect(systemContent).toContain("Malibu Marine Mammal");
    expect(systemContent).toContain("April 15");
  });

  it("passes the full conversation history to the LLM", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [{ message: { content: "Follow-up response" } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const messages = [
      { role: "user" as const, content: "What's the best route?" },
      { role: "assistant" as const, content: "The North route is great!" },
      { role: "user" as const, content: "How long does it take?" },
    ];

    await caller.scout.chat({ messages });

    const callArgs = mockInvokeLLM.mock.calls[0]?.[0];
    expect(callArgs).toBeDefined();
    // System prompt + 3 user/assistant messages = 4 total
    expect(callArgs!.messages).toHaveLength(4);
    expect(callArgs!.messages[1]).toEqual({ role: "user", content: "What's the best route?" });
    expect(callArgs!.messages[2]).toEqual({ role: "assistant", content: "The North route is great!" });
    expect(callArgs!.messages[3]).toEqual({ role: "user", content: "How long does it take?" });
  });

  it("handles LLM errors gracefully", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockRejectedValueOnce(new Error("LLM service unavailable"));

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.scout.chat({
        messages: [{ role: "user", content: "Hello" }],
      })
    ).rejects.toThrow();
  });

  it("returns fallback content when LLM response has no choices", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.scout.chat({
      messages: [{ role: "user", content: "Hello" }],
    });

    expect(result.content).toBe("Sorry, hit a snag. Try again?");
  });

  it("validates that messages array cannot be empty (still sends system prompt)", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [{ message: { content: "Hello!" } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.scout.chat({ messages: [] });
    expect(result.content).toBe("Hello!");
    // Should still call LLM with just the system prompt
    const callArgs = mockInvokeLLM.mock.calls[0]?.[0];
    expect(callArgs!.messages).toHaveLength(1); // Only system message
  });

  it("includes all 4 route names in the system prompt", async () => {
    const mockInvokeLLM = vi.mocked(invokeLLM);
    mockInvokeLLM.mockResolvedValueOnce({
      choices: [{ message: { content: "Route info" } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.scout.chat({
      messages: [{ role: "user", content: "What routes are available?" }],
    });

    const callArgs = mockInvokeLLM.mock.calls[0]?.[0];
    const systemContent = callArgs!.messages[0]!.content as string;
    expect(systemContent).toContain("NORTH");
    expect(systemContent).toContain("SOUTH");
    expect(systemContent).toContain("WILD CARD 1");
    expect(systemContent).toContain("WILD CARD 2");
    expect(systemContent).toContain("Daintree");
    expect(systemContent).toContain("Whitsundays");
    expect(systemContent).toContain("Undara");
  });
});
