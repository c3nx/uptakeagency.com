---
title: "AI Consulting"
description: "AI consulting that starts with where AI belongs in the company: fixed-price discovery, module-by-module delivery, data boundaries drawn upfront."
icon: "sparkles"
order: 1
locale: "en"
---

## The simple version: what is AI consulting?

Everyone wants to use AI, and most companies ask the same thing: "Fine, but where do we put it?" AI consulting is the work of answering that. We look at how the company spends its day, find where time and money get lost, and then pick the few places where AI will actually help.

It is not about installing a chatbot and leaving. Often the biggest gain is getting scattered data into one place and removing the work people do by hand every day. AI sits on top of that.

## How we work

**1. Intro call (free).** A short conversation about what the company is dealing with and whether AI has a place in it. If it does not, we say so plainly.

**2. Discovery (fixed price, about two weeks).** We go inside the company: the software in use, the Excel files, the reports, the repetitive work. At the end there is a prioritized roadmap: what comes first, how long it takes and what it gains. Together we also settle which data is needed, who is responsible and how success will be measured. The discovery fee is known upfront; if we move on to implementation, it is deducted from the implementation fee.

**3. Implementation (module by module).** We do not build everything at once. Once a module is working and proving useful, we move to the next. The code and the accounts stay with the company.

**4. Maintenance and growth.** After the system is live we stay on: updates, training for the team and new needs.

## What we do

- **Bringing company data together:** Pulling data from separate systems such as the POS, accounting, HR and inventory into one place automatically. Less time goes into preparing recurring reports by hand.
- **Assistants that work from the company's own knowledge:** When AI prepares an answer, it finds the company's own documents and data and uses them as its source. The technical name is RAG (retrieval-augmented generation); in short, letting AI read the company's archive.
- **Dashboards you can ask questions:** Panels where a manager types or speaks a question like "which branch was more profitable last month?" and gets an answer.
- **Turning messy lists into reliable data:** Lists arrive from every supplier in a different layout with missing details. We check them, catch faulty and inconsistent records, fill the gaps from reliable sources and record where each piece of information came from.
- **Preparing documents automatically:** Catalogs, quotes and pre-customs documents are prepared automatically. The file that goes to the customer does not show cost or profit margin.
- **Automating repetitive work:** Tasks that follow the same steps every day are handed to AI, with accuracy checked along the way.

## AI and computation: which is for what?

The simple version: AI is a very good reader and writer, not a calculator. It understands a text, tidies a messy list, finds missing information and answers questions. But when it "adds up" an Excel table it can get it wrong, because it does not calculate the sum, it guesses it.

For numbers, computers have long had a different tool: computation (compute). Code that gives the same result for the same input every time and whose errors can be tested. Accounting programs, spreadsheet formulas and database queries come from this world. We do not throw it aside because AI is in fashion.

We do not mix the two, we use them together:

- **AI understands:** which column is the price, which row is wrong, what the user is asking.
- **Code does the math:** totals, currency conversion, profit margin, stock. AI calls that calculation as a tool and does not make up the result itself.
- **Code checks the result:** do the totals match, is the figure within the expected range.
- **Humans approve important decisions:** an automatic check runs after every step, steps that cannot be undone go through human approval, and verified data is locked so it cannot be changed afterward.
- **The company's rules live in memory:** business rules are saved permanently, and every suggestion from AI is checked against them.

An example: when the AI analyst at Estanbul is asked "how much did the café earn last month?", the AI does not guess the number. It turns the question into a query on the data warehouse, the query does the calculation, and the AI explains the result in a clear sentence.

The full article: [Don't Let AI Add Up Your Spreadsheet](/blog/ai-and-computation).

## A real example: Estanbul's company intelligence

Estanbul runs an esports and gaming center with a café in Istanbul. Revenue sat in the gaming center software, café sales in a separate POS, costs in the franchise system, and staff and inventory elsewhere. The answer to "did we actually make a profit today?" arrived days later, compiled by hand.

Together we built this:

- Data from all of these systems arrives automatically, with no manual entry. Every night it merges into a single data warehouse (a shared store where all the data is collected).
- 75 gaming PCs are monitored in real time; when something goes wrong, the system notices on its own.
- Who sees what is defined in one place: three roles, thirteen permissions; nobody can reach data they are not permitted to see.
- There is an AI analyst you can ask by typing or by voice. It began as a demo for investors and is now part of the daily work.

The full story: [One Venue, One Screen](/blog/estanbul-dashboard-case-study).

## Where does our data stay?

It is the question asked most often in AI projects and answered least. Our rule is simple: we draw the boundaries upfront.

At Estanbul, customers' personal information (name, phone, email, username) is not carried into the data the AI can reach at any stage. The AI can only read the data, not change it. The warehouse where the data is collected sits in the European Union region. The AI layer runs on a cloud service, and only permitted data reaches it.

This is a spectrum. The first step is drawing the data boundaries; the far end is running the model (the AI itself) entirely on the company's own servers. Which one is needed, we decide together during discovery.

## Who does the work

At Uptake the work is done by our founder Cengiz Selçuk personally: 15+ years of experience in infrastructure, software and AI integration. Our corporate partnerships with MSI and Praxilla are ongoing. The person on the first call is the person who builds the system; the work is not handed off to a separate team.

## Other work

- **OEMBuilder for MSI:** A service that generates photorealistic images of assembled PCs from selected components using AI. [Project page](/work/oembuilder).
- **Custom software:** Systems built for the company where off-the-shelf software falls short. [Custom software development](/services/custom-software).

## Frequently asked questions

**What does AI consulting cover?**
Looking at the company's work to find where AI will help, turning that into a roadmap and, if wanted, building the system. We do not hand over a report and walk away; the people who plan it also build it.

**Where should we start?**
Usually with the work done most often by hand and repeated most often. The point of discovery is to choose that from data, not from a guess.

**Are off-the-shelf tools like ChatGPT not enough?**
For many jobs they are enough, and we say so. They start to fall short when the work needs to connect to existing systems, run permissions by the company's own rules or automate a process from end to end; that is where a custom solution comes in.

**How long does it take?**
Discovery takes about two weeks. Implementation depends on scope; because we work module by module, the result of each module is visible with its own delivery.

**How much does it cost?**
The intro call is free. Discovery has a fixed price, deducted if we move on to implementation. The implementation fee is set by the scope that discovery produces.

**Is our data safe?**
We draw the boundaries together upfront: which data goes to AI and which does not, and who sees what. If needed, the model runs entirely on the company's own servers.

## Let's talk

Let's talk through, in a short call, where AI will help at the company. [Contact](/contact) or info@uptakeagency.com.
