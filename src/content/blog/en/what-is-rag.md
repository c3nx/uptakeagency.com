---
title: "What Is RAG? Getting AI to Read Your Company's Documents"
description: "What is RAG: the AI finds the relevant part of your company's documents first, then writes the answer from it. How it works, its limits, and a checklist."
date: 2026-09-30
tags: ["AI", "RAG", "AI Integration"]
locale: "en"
author: "Cengiz Selçuk"
---

RAG (Retrieval-Augmented Generation) is a method where an AI finds the relevant passages in a company's documents before it writes an answer, and bases the answer on them. Instead of answering from memory, the AI reads the document in front of it. That way the answer rests on the company's own information, and it can show which document it came from.

In this post we explain in plain terms how RAG works, where it helps and where it does not, and what to check before starting in a company.

## First, the basics: the AI does not know your documents

The scene is a familiar one: a new employee is looking for the returns procedure. It sits in one of the shared folders, in a PDF updated last year, but nobody remembers exactly where. In the end the employee asks a general AI chat. The answer is fluent and confident, but it describes how returns "generally work", not the company's procedure. The model has never seen the company's document, so it guesses at something it has not seen.

RAG exists to close that gap. An open-book exam is a useful comparison. In a closed-book exam the student writes down what they memorized. In an open-book exam the student first finds the relevant page in the book, then writes the answer while looking at it. RAG puts the AI in the second student's position.

The name comes from a 2020 paper by Patrick Lewis and colleagues. The paper gives the name "RAG" to models that combine a pre-trained language model (the part where knowledge sits inside the model itself) with an external store of documents (the part reached through a search mechanism; in the paper this store is a vector index of Wikipedia, not company documents). The authors note that when models keep knowledge only inside themselves, showing the source of their decisions and updating their knowledge remain open research problems.

## How does it work?

Four steps run in the background.

1. **Preparing the documents.** The company's documents (PDFs, Word files, wiki pages, emails) are collected and cut into small pieces. This is called chunking: a two-hundred-page manual is hard to search as one block, but searchable once it is split into pieces of a few paragraphs.
2. **Giving each piece a meaning code.** Each piece is turned into a string of numbers that represents its meaning. This is called an embedding. The idea is that texts close in meaning end up with number strings that are close to each other. "How do I make a return?" and "Steps for sending a product back" share few words, but they produce nearby strings.
3. **Finding the pieces closest to the question.** When someone asks a question, it is turned into a number string in the same way, and the closest pieces in the archive are looked up. This is called vector search (a string of numbers is called a vector). It differs from classic search in that it looks at meaning, not at the words themselves.
4. **Writing the answer from those pieces.** The few pieces found are given to the AI together with the question, with the instruction "answer only from these and show the source". The AI writes the answer, and the document it came from is visible next to it.

So the AI does not memorize the whole archive. For each question it puts a few relevant pages in front of itself.

## When does it help?

RAG makes sense when the answer is written down in the company's own texts:

- Internal assistants where new employees or the support team ask about procedures, contract clauses and product manuals.
- Work with many documents, where the answer to a typical question sits in a few paragraphs.
- Documents that change often: when a new document is added to the archive, the assistant sees it on the next question, and the model does not have to be retrained.

## When does it not help? Limits

- **If the documents are bad, the answers are bad.** If old, contradictory or half-finished documents are in the archive, the assistant answers from them. RAG does not fix documents; putting the documents in order is often the real work of the project.
- **If the wrong piece is found, the answer can still be wrong.** If the search puts an unrelated piece first, the model can write a plausible-looking but wrong answer from it. That is why the source has to be shown with the answer, and someone has to be able to open it and check.
- **Adding up numbers and doing calculations is not RAG's job.** "How many orders did we have last quarter in total?" is answered by calculating, not by reading documents. We covered the case where a model guesses a total in a separate post: [Don't Let AI Add Up Your Spreadsheet](/blog/ai-and-computation).
- **Questions no document answers.** When a user asks for information that is not in the archive, the assistant should say "I could not find it". That has to be designed and tested from the start.

## RAG versus retraining the model

Retraining a model (fine-tuning) can be pictured as giving an employee months of training. The knowledge settles in the employee's head, but when it changes the training has to be repeated, and the employee cannot say where they learned it.

RAG is like putting a manual on the employee's desk. When the manual changes, the employee reads the new page, and can also show which page they looked at when answering. Because company documents change often and we want the source of an answer to be visible, RAG is usually the better starting point for internal assistants. Fine-tuning comes up more when we want to change the model's tone or the way it does a particular task. The two methods do not replace each other, and can be used together if needed.

## Permissions and data limits

Not everyone in a company sees every document: salary tables belong to human resources, contract drafts to legal. If an AI assistant can reach the whole archive, it may answer someone's question from a document that person is not allowed to see. The rule is simple: the AI should show a document only to the people who can already see it. In the search step, the pieces found must be filtered by the user's permissions.

Estanbul is an example of the same principle. Estanbul is an esports and gaming center with a cafe in Istanbul, and the company intelligence system we built there includes a written and voice AI analyst. That system is not a document-based RAG: the analyst turns the question into a query in the data warehouse. But the principle of limiting up front which data goes to the AI is the same. The system has three roles and thirteen separate permissions, the AI reaches the data with read-only access, and customers' personal information (name, phone, email, username) never moves into the data the AI can reach at any stage. We draw the limit when the system is built.

## A short checklist before starting

- **Where are the documents?** Shared folders, email, personal computers, paper archives: an inventory comes first.
- **Are they current?** If three versions of the same procedure sit around, it must be clear which one is valid.
- **Who can see what?** Permission rules should be tied to the documents from the start; adding them later is hard.
- **Does the answer show its source?** Every answer should show which document it came from, so the user can verify it.
- **How will accuracy be measured?** Prepare a test list of questions with known answers, and run the assistant against it after every change.

To look together at whether your documents suit this job and where AI will help in your company: [AI Consulting](/services/ai-consulting).

## Sources

- Lewis et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", arXiv 2005.11401 (May 2020): https://arxiv.org/abs/2005.11401
