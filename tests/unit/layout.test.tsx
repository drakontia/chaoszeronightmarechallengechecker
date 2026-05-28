import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import RootLayout from "@/app/layout";

vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("ja"),
  getMessages: vi.fn().mockResolvedValue({}),
}));

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

afterEach(cleanup);

describe("RootLayout", () => {
  test("Vercel Analytics コンポーネントがレンダリングされる", async () => {
    const layout = await RootLayout({ children: <div>content</div> });
    render(layout);
    expect(screen.getByTestId("vercel-analytics")).toBeTruthy();
  });
});
