---
title: "Sovereign AI: Where Does Our Data Go?"
description: "Bringing AI into a company: who keeps control of the data and the competitive edge? Four things to check in sovereign AI, and where to start."
date: 2026-09-30
tags: ["AI", "Data Security", "Strategy"]
locale: "en"
author: "Cengiz Selçuk"
---

At a management meeting, an AI pilot is being presented. Sales contracts, price lists and customer emails will be fed to a model. Someone at the table asks: "Where does this data go? Does the provider train its own model on it?" The answer is "we have security measures in place." The question stays unanswered, and the pilot waits.

## First, the basics: what does sovereign AI mean?

Sovereign AI means a company keeps control over its own data and its competitive edge while it uses AI. The competitive edge is whatever the company does differently from its rivals: its pricing logic, its supplier relationships, the way it knows its customers. The documents and tables given to an AI carry all of it.

Sovereignty does not mean running everything on your own servers. The company should know where its data goes, what it is used for and how it can be taken back if needed, and it should be the one who decides.

Alex Karp, co-founder and CEO of Palantir, calls the stack Palantir has built from open models and its ontology layer a "sovereign stack". The joint announcement by Palantir and NVIDIA dated 10 September 2026 presents that stack under the heading of sovereign AI. According to the announcement, an organization keeps control and ownership of its own data, and keeps control over its models and deployment environment as well. This post does not recommend Palantir's product, it describes the principle for companies of any size. The Next Web, reviewing the same announcement, points out that even when ownership of the data's contents stays with the company, dependence can continue on the ontology that structures the data, the models, the software and the hardware.

## Why it matters

For AI to be useful, it has to see the company's real data. That same data is one of the company's most valuable assets. What a provider does with data (keeping records, training models, sharing with third parties) is written in its contract and differs from provider to provider. There is no ready-made answer; each provider's own text has to be read.

## Four parts

We put these four together ourselves; the announcements contain no such list.

1. Data ownership: the company's data must not be used to train or improve the provider's model. The guarantee should be in writing, not verbal.
2. Independent infrastructure: the company should know where the model runs, which region the data sits in and what happens if the provider changes.
3. Model flexibility: the company should not be tied to a single closed model. Open-weight models (models whose weights can be downloaded and run in the company's own environment) should be among the options, and whichever fits the job should be used.
4. Contracts and legal awareness: does the contract leave the door open to data leaks or to an unintended transfer of intellectual property? If personal data is involved, are the requirements of the applicable data protection law met (in Turkey, KVKK)?

## The ontology layer: how the company works

The word ontology comes from philosophy: a description of the things that exist and how they relate. In a company, it means writing down the way the company works, in a structure an AI can read: what each record means, which concept connects to which, which rule applies where, who may see which data.

This layer does two jobs. The first is to help the model understand the company correctly. Looking at a raw table, a model guesses; knowing the structure, it does not have to guess what each column means. The second is to draw the boundaries: which data goes to the model and which does not is decided in this layer. The model does not take ownership of the data, it uses it within the frame the company defined. If the company's knowledge sits in this layer and not only in people's heads, it does not all leave with an employee.

## A spectrum: where to start

Sovereign AI is a spectrum. The far end may not be right for everyone.

The first step is to draw data boundaries: which data goes to the AI, which does not, who sees what. The next steps are choosing a provider and contract, model flexibility and infrastructure independence. The far end is running the model on the company's own infrastructure. An NVIDIA post dated 29 June 2026 describes one example: with the new engine Palantir introduced for US government agencies, agencies can run customized open models on their own infrastructure, can train them on their own data and can keep full ownership of the resulting model weights. That kind of setup takes serious investment, and it is not every company's first step.

Estanbul is a good example of the first step on the spectrum. Estanbul is an esports and gaming center with a cafe in Istanbul, and we built its company intelligence system. Data comes from the gaming center software, the cafe point-of-sale system, the franchise cost system and internal databases with no manual entry, and it comes together every night in a single data warehouse. The warehouse sits in the European Union region. Three roles and thirteen separate permissions are defined. The AI analyst, which people ask by typing or by voice, reaches the data with read-only access. Customers' personal information (name, phone, email, username) is never moved into the data the AI can reach, at any stage.

Here the AI runs on a cloud service, so the model does not run on the company's own server. This is a controlled data boundary: only permitted data reaches the AI. For many businesses that is the right place to begin.

## Questions for the provider

- Is the company's data used to train or improve the model? In which document is the answer written?
- In which region is the data processed and stored? How long is it kept, and how are deletion requests handled?
- Which data goes to the AI and which never does? Who defines that boundary, and where?
- If the provider changes, can the structure the company built (documents, rules, ontology) be taken out, or does it stay tied to the provider?
- If a move to an open-weight model becomes necessary, is that possible?

To work out together where AI should start in your company and how the data boundaries should be drawn: [AI Consulting](/services/ai-consulting).

## Sources

- NVIDIA, "NVIDIA and Palantir Bring Sovereign Intelligence to Critical Supply Chains" (10 September 2026): https://nvidianews.nvidia.com/news/nvidia-and-palantir-bring-sovereign-intelligence-to-critical-supply-chains
- NVIDIA, "Open Models, Closed Environments: Palantir Brings Secure AI to US Agencies With NVIDIA Nemotron" (29 June 2026): https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/
- The Next Web, "Nvidia and Palantir are selling a sovereign AI stack, starting with Nvidia's own supply chain" (10 September 2026): https://thenextweb.com/news/nvidia-palantir-sovereign-ai-supply-chains
