---
title: "Quix"
description: "Real-time interactive quiz platform with live multiplayer support, real-time WebSocket communication, and a modern monorepo architecture."
tags: ["Next.js", "Express.js", "WebSocket", "Real-time", "MongoDB"]
type: "client"
featured: true
order: 4
locale: "en"
---

## Overview

Quix is a real-time interactive quiz platform that enables live multiplayer quiz sessions. Built as a full-stack monorepo, it features instant WebSocket-based communication for seamless real-time gameplay, a modern React frontend, and a robust API backend.

## Technical Architecture

The platform is built as a Turborepo monorepo with shared TypeScript packages:

- **Frontend**: Next.js 15 with React 19, Tailwind CSS, and SWR for data fetching
- **Backend**: Express.js REST API with Mongoose, Pusher integration, and Zod validation
- **Real-time**: Sockudo WebSocket server for live quiz events and player synchronization
- **Shared**: Common TypeScript types, Zod schemas, and constants across all apps
- **Infrastructure**: Dockerized deployment with Bun runtime and Nginx for static assets

## Key Features

- **Live multiplayer quizzes**: Real-time question delivery and answer collection across participants
- **Instant feedback**: WebSocket-powered score updates and leaderboard changes
- **Admin dashboard**: Quiz creation, question management, and session analytics
- **Landing page**: Astro-powered marketing site with documentation
- **Scalable architecture**: Redis caching, MongoDB persistence, and containerized microservices

## Impact

Built to handle concurrent quiz sessions with hundreds of participants, delivering sub-100ms response times for real-time interactions.
