import fs from "fs";
import ReactDOMServer from "react-dom/server";
import { MDXProvider } from "@mdx-js/react";
import { Feed } from "feed";
import { getAllPosts } from "../src/getAllPostPreviews";

const siteUrl = "https://quoc17072006-blog.vercel.app";

const feed = new Feed({
  title: "Quoc's Blog",
  description:
    "This is the place where I jot down my thoughts, and many other things.",
  id: siteUrl,
  link: siteUrl,
  language: "en",
  image: `${siteUrl}/favicon-32x32.png`,
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, @quoc17072k6`,
  feedLinks: {
    rss: `${siteUrl}/feed.xml`,
    json: `${siteUrl}/feed.json`,
    atom: `${siteUrl}/atom.xml`
  },
  author: {
    name: "Võ Quốc",
    link: "https://www.facebook.com/quoc17072k6"
  }
});

getAllPosts().forEach(({ link, module: { meta, default: Content } }) => {
  const mdx = (
    <MDXProvider>
      <Content />
    </MDXProvider>
  );
  const html = ReactDOMServer.renderToStaticMarkup(mdx);
  const postText = `<p><em>(The post <a href="${siteUrl + link}">${
    meta.title
  }</a> appeared first on <a href="${siteUrl}">Tailwind CSS Blog</a>.)</em></p>`;
  feed.addItem({
    title: meta.title,
    id: meta.title,
    link,
    description: meta.description,
    content: html + postText,
    author: meta.authors.map(({ name, contact }) => ({
      name,
      link: `${contact}`
    })),
    date: new Date(meta.date),
    image: siteUrl + meta.image,
    ...(meta.discussion
      ? {
          comments: meta.discussion,
          extensions: [
            {
              name: "_comments",
              objects: {
                about: "Link to discussion forum",
                comments: meta.discussion
              }
            }
          ]
        }
      : {})
  });
});

fs.writeFileSync("./out/feed.xml", feed.rss2());
fs.writeFileSync("./out/atom.xml", feed.atom1());
fs.writeFileSync("./out/feed.json", feed.json1());
