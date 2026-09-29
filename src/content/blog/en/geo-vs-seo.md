---
title: "GEO vs SEO vs AEO: What GEO Is and What Actually Works"
description: "GEO vs SEO explained: generative engine optimization gets a site cited in AI answers. What the research and Google say, and what we measured on our own site."
date: 2026-09-30
tags: ["GEO", "SEO", "AEO", "AI"]
locale: "en"
author: "Cengiz Selçuk"
---

Generative engine optimization (GEO) is the work of getting our site chosen as a source in the answers that tools like ChatGPT, Gemini, Perplexity or Google's AI Mode give. The goal of SEO is to rank high in search results. The goal of GEO is for an AI tool to read our page and quote it while it prepares its answer.

In this post we simplify the three terms, look at what the research says today, and share a measurement we ran on our own site.

## First, the basics: GEO vs SEO vs AEO on three different screens

Say someone has a question: "How do I choose an AI consultant for my company?"

- **If they type it into Google,** they get ten links. Which site sits at the top is the subject of SEO (search engine optimization).
- **If Google answers in a short box above the list,** or a voice assistant on the phone reads the answer aloud, the person often clicks on no site at all. The work of getting that short answer taken from our page is called AEO (answer engine optimization). That is the main difference in AEO vs SEO: the aim is to be the answer itself, because the click may never happen.
- **If they ask ChatGPT or Google's AI Mode,** they get a long, compiled answer, with a few sources shown under it or inside it. Being one of those sources is the subject of GEO.

The same question sits behind all three: can this page be read, does it answer the question clearly, and can it be trusted?

## Where the term GEO comes from

The term comes from an academic paper published in November 2023 and accepted to the KDD 2024 conference: "GEO: Generative Engine Optimization" by Aggarwal and colleagues. The researchers built a test environment and measured how changes to a page affect its visibility in AI answers.

Key findings:

- **Citing sources, adding quotations and adding statistics** were the methods that worked best. The paper's abstract says these methods can raise visibility by up to 40 percent.
- **Keyword stuffing** (repeating the same word through the text) hardly worked at all; in one test it fell below the baseline.
- **Sites lower in the rankings** gained more from these methods. A site in fifth place on Google more than doubled its visibility in AI answers after adding sources.
- The effect varies from topic to topic.

A note of caution is needed here. "Up to 40 percent" is the best result measured in a test environment, and it is no promise for any given site. Still, the direction is clear: AI tools prefer to quote text that gives concrete information and itself rests on sources.

## What Google says

Google has published an official guide for site owners on AI Overviews and AI Mode. The core of it is short:

- To appear in these features there is **no extra requirement and no special optimization**; the known good practices of SEO apply.
- For a page to be shown as a source, it **has to be in Google's index and eligible to be shown in search results with a snippet**.
- **No new machine-readable file or special structured data is needed** for these features.

The last point also matters for the llms.txt file that has been much discussed lately (a proposed text file that summarizes a site for AI tools). Google says such a file is not needed to appear in its AI features. We should not build our visibility on Google around a file like that.

On the AEO side, what Google says is similar. Google's own systems choose the short answer boxes above the results (featured snippets); there is no way to mark a page with "pick this one". As for the special markup added for frequently asked questions, since August 2023 it has been shown as a rich result only on well-known government and health sites. So in AEO too, the work comes down to writing a good page that answers the question clearly.

## Keeping the door open to bots

For AI tools to read our site, they first have to be able to get in. A common confusion here is that one company can run several bots, and they do different jobs.

- **OpenAI:** OAI-SearchBot comes to show sites in ChatGPT's search results, while GPTBot is for training models. OpenAI recommends allowing OAI-SearchBot for those who want to appear in search results.
- **Anthropic:** Claude-SearchBot is for search quality, ClaudeBot is for training.
- **Perplexity:** PerplexityBot is for showing sites in Perplexity's search results; according to Perplexity it is not used for model training.
- **Google:** Google-Extended controls whether a site's content is used to train Gemini models. According to Google, this setting does not affect whether the site appears in Google Search.

The practical result: blocking training bots is a matter of choice, while blocking search bots means the site never enters the answers of those tools. This distinction has to be made deliberately in the robots.txt file.

## We measured our own site: today we are not there

On 30 September 2026 we asked Google's AI Mode four questions. We asked them in Turkish, so we keep the original wording here, with an English translation in parentheses:

- "İstanbul'da yapay zeka danışmanlığı veren firmalar hangileri?" (Which firms offer AI consulting in Istanbul?)
- "Türkiye'de GEO hizmeti veren ajanslar hangileri?" (Which agencies offer GEO services in Turkey?)
- "SEO ile GEO arasındaki fark nedir?" (What is the difference between SEO and GEO?)
- "Kurumsal şirketler için yapay zeka danışmanlığı alırken nelere dikkat edilmeli?" (What should corporate companies look out for when buying AI consulting?)

Uptake does not appear in any of the four answers. The answer to the GEO agencies question names ten agencies, and the answer to the consulting question starts with the big consulting firms. A large part of the answers appears to be compiled from the agencies' own posts and from list pages of the "best agencies" kind.

We take two things from this. First, AI does not find a new site on its own; other sites, lists and directories have to mention us. Second, posts that answer the question directly get quoted, and that is why this post exists.

We will ask the same four questions again on 23 November 2026 and share the result here.

## A short checklist

- **Can Google see the page?** Is the page in the index, and does it show up in search results with its description? This is the first condition of GEO.
- **Can search bots get in?** The robots.txt file should not block OAI-SearchBot, Claude-SearchBot and PerplexityBot.
- **Is the answer in the first paragraph?** The question a page answers should be answered in the first few sentences, short and clear enough to be quoted, with the detail coming after.
- **Are there sources and numbers?** Research shows that text with sources, sourced information and statistics gets quoted more. A number without a source damages trust.
- **Do other sites mention us?** Industry lists, directories and links from other sites help both on Google and in AI answers.
- **Are we measuring?** We need to ask the target questions to AI tools at regular intervals and see who is shown as a source.

## Sources

- Aggarwal et al., "GEO: Generative Engine Optimization", arXiv 2311.09735 (November 2023, KDD 2024): https://arxiv.org/abs/2311.09735
- Google Search Central, "AI features and your website": https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, featured snippets: https://developers.google.com/search/docs/appearance/featured-snippets
- Google Search Central Blog, changes to FAQ and how-to results (8 August 2023): https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google crawlers and Google-Extended: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- OpenAI bots: https://developers.openai.com/api/docs/bots
- Anthropic crawlers: https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity bots: https://docs.perplexity.ai/guides/bots

To measure together where your site stands today on Google and in AI answers: [SEO, GEO & AEO Consulting](/services/seo-geo).
