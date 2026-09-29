---
title: "Don't Let AI Add Up Your Spreadsheet"
description: "AI reads a spreadsheet and understands it, but it can guess the total. What the research shows and the right setup: AI understands, code does the math."
date: 2026-09-30
tags: ["AI", "Data", "Automation"]
locale: "en"
author: "Cengiz Selçuk"
---

The scene is a familiar one: the month-end sales spreadsheet gets uploaded to an AI chat and someone asks, "What was our total revenue this month?" The answer arrives in a few seconds, in a confident sentence. The number may be right or wrong, and there is no way to tell which by looking at the answer.

In this post we explain why in plain terms, and show how we use AI with numbers in a company with confidence.

## First, the basics: AI reads, a calculator calculates

The language models behind tools like ChatGPT, Gemini or Claude are trained on text. They read very well: they understand which column is the price, which row was entered wrongly, and what the user is asking. They tidy up a messy list, notice missing information and summarize a long report.

Adding up is a different job. Anthropic says so openly in its research post examining how Claude works inside: Claude was not designed as a calculator, it was trained on text, and it has no mathematical algorithms inside. The same post describes how the model can still often add numbers correctly "in its head". That is where the problem lies: it is right most of the time and wrong some of the time, and when it is wrong it does not say so.

The formula in Excel or in an accounting program, on the other hand, gives the same result for the same input every time. If it has a bug, it can be tested and found. The name of that world is computation (compute).

## What the research shows

- **Financial spreadsheets:** A 2026 study (FinSheet-Bench, an arXiv preprint) tested models from OpenAI, Google and Anthropic on extracting information from real financial spreadsheets. The best model reached 82.4 percent accuracy, which means roughly one error in six questions. Accuracy fell as the spreadsheets grew larger and more complex: an average of 86.2 percent on the easiest file and 48.6 percent on the largest. The researchers concluded that no model reaches an error rate low enough for unsupervised use in professional finance work, and that reliable results require separating understanding the document from exact calculation.
- **Question answering over multiple tables:** The TQA-Bench study reports that models struggle noticeably more with questions that need explicit calculation over many cells, such as adding them up.
- **Handing the calculation to code:** The 2022 PAL study showed that even when a model breaks a problem into the right steps, it makes logic and arithmetic errors in the solution step. The fix it proposed is to leave the calculation step to a Python interpreter.

Microsoft gives the same warning for its own product. The frequently asked questions page for Copilot in Excel says Copilot can sometimes make mistakes, misinterpret information or produce inaccurate results, and asks that everything Copilot produces be reviewed and verified before use.

## The right setup: AI understands, code does the math

We do not have to keep AI away from numbers; it is enough to separate the two jobs. In the systems we build, the division of work looks like this:

- **AI understands:** the user's question, which column of which table to look at, which record looks suspicious.
- **Code does the math:** totals, currency conversion, profit margin, stock. The AI calls this calculation as a tool; it does not produce the result itself.
- **Code checks the result too:** do the totals add up, is the number within the expected range.
- **A person approves the important decisions.**

The big AI companies offer this structure as tools too. OpenAI's code interpreter lets the model write and run Python code, and is presented for data analysis and math work. Google's code execution tool on the Gemini side works on the same logic: the model writes the code, runs it and builds its answer from the result.

## A real example: "How much did the cafe earn last month?" at Estanbul

Estanbul is an esports and gaming center with a cafe in Istanbul. In the company intelligence system we built, all sales and cost data comes together every night in a single data warehouse (a shared store where all the data is collected). Managers ask an AI analyst questions, by typing or by voice.

When someone asks "How much did the cafe earn last month?", the AI does not guess the number. It turns the question into a query that runs in the data warehouse, and the query does the adding. The AI takes the result of the query and explains it in a clear sentence. It also has read-only access to the data and cannot change any record.

## A short checklist

- **Who produces the number?** Does the number in the answer come from a formula, a query or code, or from the model's own sentence? In the second case, no decision should be made before the number is verified.
- **Can the calculation be repeated?** Asking the same question twice should give the same number. If it does not, the calculation should move into code.
- **Is there a check?** There should be a separate step that checks whether the totals add up.
- **Who approves?** Decisions involving money should have a person at the last step.

To work out together where AI will help in your company and where numbers should be left to code: [AI Consulting](/services/ai-consulting).

## Sources

- Anthropic, "Tracing the thoughts of a large language model" (27 March 2025): https://www.anthropic.com/research/tracing-thoughts-language-model
- FinSheet-Bench, arXiv 2603.07316 (March 2026): https://arxiv.org/abs/2603.07316
- TQA-Bench, arXiv 2411.19504 (November 2024): https://arxiv.org/abs/2411.19504
- Gao et al., "PAL: Program-aided Language Models", arXiv 2211.10435: https://arxiv.org/abs/2211.10435
- Microsoft, frequently asked questions about Copilot in Excel: https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel
- OpenAI, code interpreter: https://developers.openai.com/api/docs/guides/tools-code-interpreter
- Google, Gemini code execution: https://ai.google.dev/gemini-api/docs/code-execution
