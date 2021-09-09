// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const scrape = async (extensionId: string) => {
  const response = await fetch(
    // "https://chrome.google.com/webstore/detail/readwise-new-tab/iigdkhmjendealedklplakommgjpnhpg?hl=en"
    `https://chrome.google.com/webstore/detail/${extensionId}`
  );
  if (response.status === 200) {
    const extensionNameRegex = /(?:<h1 class="e-f-w">)(.*)(?:<\/h1>)/g;
    const ratingRegex =
      /(?:<div class="rsw-stars" title="Average rating: )(.*)(?: stars)/g;
    const body = await response.text();
    console.log(
      "🚀 ~ file: [extensionId].ts ~ line 14 ~ scrape ~ ratingValue",
      body
    );
    const ratingValue = [...body.matchAll(ratingRegex)][0][1];

    const extensionName = [...body.matchAll(extensionNameRegex)][0][1];
    return { ratingValue, extensionName };
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
    const currentUrl = req.headers.host;
    const shieldsUrl = new URL("https://img.shields.io/endpoint");
    shieldsUrl.searchParams.append(
      "url",
      `https:${currentUrl}/api/reviews/${extensionId}`
    );
    res.redirect(shieldsUrl.toString());
  } else {
    const { extensionName, ratingValue } = await scrape(extensionId as string);
    res.status(200).json({
      schemaVersion: 1,
      label: extensionName,
      message: `${ratingValue} stars`,
      color: "yellow",
    });
  }
}
