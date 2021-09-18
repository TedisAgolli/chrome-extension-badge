// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { makeBadge } from "badge-maker";

const scrape = async (extensionId: string) => {
  const response = await fetch(
    // "https://chrome.google.com/webstore/detail/readwise-new-tab/iigdkhmjendealedklplakommgjpnhpg?hl=en"
    `https://chrome.google.com/webstore/detail/${extensionId}`
  );
  if (response.status === 200) {
    const installCountRegex = /(?:title=")(\d.*)(?: users")/g;
    const extensionNameRegex = /(?:<h1 class="e-f-w">)(.*)(?:<\/h1>)/g;
    const body = await response.text();
    const extensionName = [...body.matchAll(extensionNameRegex)][0][1];
    const installCount = [...body.matchAll(installCountRegex)][0][1];
    return { extensionName, installCount };
  }
  return {};
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  let { extensionId } = req.query;
  if (Array.isArray(extensionId)) {
    extensionId = extensionId[0];
  }

  if (extensionId.endsWith(".svg")) {
    extensionId = extensionId.slice(0, -4);
    const { extensionName, installCount } = await scrape(extensionId as string);
    const format = {
      label: extensionName || "",
      message: `${installCount} users` || "",
      color: "orange",
    };
    const svg = makeBadge(format);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } else {
    const { extensionName, installCount } = await scrape(extensionId as string);
    res.status(200).json({
      name: extensionName,
      message: `${installCount} users`,
    });
  }
}
