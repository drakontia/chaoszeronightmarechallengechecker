import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Footer } from "@/components/Footer";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("Footer", () => {
  test("コピーライト表記が表示される", () => {
    render(<Footer />);
    expect(screen.getByText(/ChaosZeroNightmare Challenge Checker/)).toBeTruthy();
    expect(screen.getByText(/2026 Drakontia/)).toBeTruthy();
  });

  test("GitHub リポジトリへのリンクが存在する", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /github/i });
    expect(link.getAttribute("href")).toBe(
      "https://github.com/drakontia/ChaosZeroNightmareChallengeChecker",
    );
  });

  test("GPL v3 の表記が表示される", () => {
    render(<Footer />);
    expect(screen.getByText(/GPL v3/i)).toBeTruthy();
  });

  test("footer 要素としてレンダリングされる", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeTruthy();
  });
});
