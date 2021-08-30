// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const scrape = async (extensionId: string) => {
  const response = await fetch(
    // "https://chrome.google.com/webstore/detail/readwise-new-tab/iigdkhmjendealedklplakommgjpnhpg?hl=en"
    `https://chrome.google.com/webstore/detail/${extensionId}`
  );
  if (response.status === 200) {
    const installCountRegex = /(?:<Attribute name="user_count">)(\d+)(?:<)/g;
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
    const currentUrl = window.location.host;
    const shieldsUrl = new URL("https://img.shields.io/endpoint");
    shieldsUrl.searchParams.append(
      "url",
      `https:${currentUrl}/api/${extensionId}`
    );
    res.redirect(shieldsUrl.toString());
  } else {
    const { extensionName, installCount } = await scrape(extensionId as string);
    res.status(200).json({
      schemaVersion: 1,
      label: extensionName,
      message: `${installCount} users`,
      color: "orange",
    });
  }
}
