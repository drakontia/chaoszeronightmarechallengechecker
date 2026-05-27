import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ChallengeHeader } from "@/components/ChallengeHeader";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ href, target, rel, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} target={target} rel={rel} {...props}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe("ChallengeHeader", () => {
  test("renders the deck builder link", () => {
    render(<ChallengeHeader />);

    const deckBuilderLink = screen.getByRole("link", { name: /site\.deckBuilder/ });
    expect(deckBuilderLink).toBeDefined();
  });

  test("deck builder link points to the correct URL", () => {
    render(<ChallengeHeader />);

    const deckBuilderLink = screen.getByRole("link", { name: /site\.deckBuilder/ });
    expect(deckBuilderLink.getAttribute("href")).toBe("https://czn-deck-builder.drakontia.com/");
  });

  test("deck builder link opens in a new tab", () => {
    render(<ChallengeHeader />);

    const deckBuilderLink = screen.getByRole("link", { name: /site\.deckBuilder/ });
    expect(deckBuilderLink.getAttribute("target")).toBe("_blank");
  });
});
