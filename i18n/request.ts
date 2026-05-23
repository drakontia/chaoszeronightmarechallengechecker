import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => ({
  locale: "ja",
  messages: (await import("@/messages/ja/common.json")).default,
}));
