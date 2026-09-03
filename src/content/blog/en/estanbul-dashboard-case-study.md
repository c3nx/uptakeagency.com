---
title: "One Venue, One Screen: A Custom Operations Dashboard for a Gaming Center"
description: "How a single-location gaming entertainment business replaced scattered spreadsheets with one real-time view of staff, revenue, and profit and loss."
date: 2026-09-02
tags: ["Case Study", "Custom Software", "Operations", "Dashboards"]
locale: "en"
---

Closing time at a gaming center is a second shift of paperwork. Someone reconciles the till. Someone copies station hours into a spreadsheet. The shift lead notes who came in late and who covered for whom. Food and drink sales live in the point of sale system, staff hours live in a separate file, and the maintenance log is a notebook behind the counter.

None of that is unusual for a business running a single location. What is costly is how long it takes to answer one basic question: did today actually make money? In most single-venue operations that answer arrives days or weeks late, assembled by hand, and by then it is history rather than a decision.

Estanbul runs one venue. That is the entire operation, not a pilot site for a chain. We still built them a full operations and analytics platform, the [Estanbul Dashboard](/work/estanbul-dashboard), and the reason is simple: the management burden of a single location is already big enough to be worth removing.

## What we actually built

The platform pulls venue management, personnel tracking, and business analytics into one real-time interface. It is easiest to describe in three parts: people, money, and operations.

### People

The personnel module is a complete HR layer for venue operations, not a headcount list:

- Employee attendance with clock-in and clock-out, backed by biometric attendance integration so recorded hours match reality
- Automated payroll hour calculations with overtime rules
- Shift scheduling with shift templates and rotation patterns, plus swap requests and conflict detection
- Leave management with approval workflows
- Performance reviews and incident logging, alongside individual and team performance views

What biometric attendance buys is not surveillance. It is payroll hours that come from a record rather than from someone's memory of a Tuesday.

### Money

The financial side is what management looks at first every morning:

- Daily revenue breakdowns
- Expense tracking
- Profitability analysis per station, so the venue can see which parts of the floor carry their own cost

Station-level profitability is the number a generic sales report rarely gives you. A point of sale system can tell you what was sold. It usually cannot tell you whether a given station earns the space, the hardware, and the power it consumes.

### Operations

The operational layer covers the floor itself:

- Live venue occupancy and customer traffic patterns
- Revenue per station in real time
- Gaming hardware inventory
- Maintenance schedules and replacement tracking

Hardware in a gaming venue is a depreciating asset that fails at the worst possible moment. Tracking maintenance and replacement in the same system that tracks revenue per station means a replacement decision can be argued with numbers instead of instinct.

The platform also supports a centralized multi-venue view with drill-down. Estanbul does not need that today. It is there so a second location would not require a second system.

## What changed in daily management

The honest summary of the outcome is not a percentage. Management got much easier. The single biggest win, by the venue's own account, was seeing daily revenue and profit and loss on one screen.

That sounds modest until you count what it replaces. Before the dashboard, that picture had to be assembled by hand from multiple disconnected spreadsheets and manual processes, arithmetic nobody wanted to repeat often enough for it to be useful. The platform replaced all of that with one place to look.

Two things follow from that. The first is administrative: hours that went into assembling reports stop going into assembling reports. The second matters more. When the numbers are current rather than reconstructed, decisions no longer wait on a report that arrives after the fact. Whether an overtime pattern is a staffing problem or a demand pattern, whether a slow section of the floor is slow every day or only on weekdays, whether a maintenance cost is recurring on one specific set of machines: those are all questions you can only ask if the data arrives while it is still actionable.

We built the [Estanbul AI Agent](/work/estanbul-ai-agent) for the same client, a multi-channel customer service agent covering WhatsApp, web chat, and social. It gets more attention because AI does. The dashboard is the piece that changed how the business is run day to day.

## Packaged software or a custom build

This is the part most case studies skip, so here is a straight answer.

An off-the-shelf system is usually the right call when your operation has a common shape. If you sell products rather than time on a machine, a standard point of sale suite plus a payroll provider will cover most of what you need. If your staff count is small and stable, scheduling inside a generic tool is fine. If the reports the vendor already ships answer your questions, buy the vendor's product. Custom software that reproduces an existing subscription is a waste of money.

A custom build starts to make sense when a few conditions stack up:

- **Your unit of profit is unusual.** A gaming venue earns per station-hour. Most retail and restaurant reporting is built around product SKUs, and it cannot express that.
- **The answer you need spans systems.** Profit and loss that depends on staff hours, station revenue, and hardware costs at once will never appear in a tool that only owns one of those three.
- **You are already paying for integration by hand.** Manual exports and copy-paste between systems are a real recurring cost, just an invisible one, and they get worse as the business grows.
- **You need a specific hardware or process integration.** Biometric attendance, station-level revenue tracking, and venue-specific shift rules are exactly the things generic products treat as edge cases.

The trade-offs are real. A custom platform is something you own, which also means something you maintain. It costs more than a subscription on day one. It needs a clear integration surface to be worth building, and it needs someone to keep it running afterward. It earns its place when the alternative is permanent manual work and decisions made on stale numbers, which is precisely the situation a single busy venue tends to be in.

## The single-location takeaway

You do not need to be a chain to justify this. The reason to centralize is not that you have many locations to compare. It is that one location already generates staff data, revenue data, expense data, and asset data in separate places, and reassembling those by hand is a job nobody was hired to do.

If your operation has that shape, the question worth asking is narrow: which decision are you currently making late because the number arrives late? Answer that honestly and you will know whether packaged reporting is enough or whether a build is warranted.

If it is a build, that is what our [custom software development](/services/custom-software) work is for. [Get in touch](/contact) and describe your operation, and we will tell you plainly whether a custom platform is the right answer for it.
