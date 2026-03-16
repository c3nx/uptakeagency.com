---
title: "CastHub"
description: "Self-hosted remote broadcast production monitoring and control platform. Real-time stream health monitoring, OBS/vMix control, and caster management from a web dashboard."
tags: ["Real-time", "WebSocket", "React", "Broadcast", "OBS"]
type: "client"
featured: false
order: 6
locale: "en"
---

## Overview

CastHub is a self-hosted remote broadcast production monitoring and control platform. It allows operators and clients to monitor stream health, control broadcast sources (OBS/vMix), manage casters via CleanFeed, and view platform metrics — all from a web dashboard.

## Challenge

Clients travel from other cities to use broadcast production bootcamp rooms. The need for remote monitoring and control of broadcast infrastructure without physical presence required a unified real-time platform.

## Solution

We built CastHub as a lean, real-time gateway that sits between broadcast equipment (OBS/vMix), streaming platforms (YouTube, Twitch, Kick), and operators. Using WebSocket-based communication through Sockudo, all state changes from broadcast sources are pushed instantly to connected dashboards.

## Key Features

- **Real-time stream monitoring**: Live health metrics from OBS/vMix pushed via WebSocket
- **Remote broadcast control**: Start/stop streams, switch scenes, and manage sources from any location
- **Multi-platform health**: Simultaneous monitoring of YouTube, Twitch, and Kick stream status
- **Caster management**: CleanFeed integration for remote caster audio feeds
- **Role-based access**: Google OAuth with operator, client, and caster permission levels
- **Self-hosted**: Full data sovereignty with Docker-based deployment

## Technical Architecture

- **Backend**: Bun.serve with direct OBS/vMix WebSocket integration
- **Frontend**: React + Vite SPA with shadcn/ui components
- **Real-time**: Sockudo (Pusher-compatible, Rust-based WebSocket server)
- **Authentication**: Google OAuth with email-based role mapping
