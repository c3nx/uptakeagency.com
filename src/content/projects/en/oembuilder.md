---
title: "OEMBuilder"
description: "B2B PC build visualization service for MSI that generates photorealistic images of assembled PC builds from selected components using AI."
tags: ["AI", "Gemini", "Python", "FastAPI", "MSI"]
type: "client"
featured: true
order: 5
locale: "en"
---

## Overview

OEMBuilder is a B2B service built for MSI that generates photorealistic images of assembled PC builds from selected MSI components using Google's Gemini AI. Partners and resellers can visualize custom PC configurations before physical assembly, streamlining the sales and configuration process.

## Technical Stack

- **AI Image Generation**: Google Gemini 3 Pro for photorealistic PC build visualization
- **Backend**: Python FastAPI with PostgreSQL
- **Integration**: REST API, JavaScript Widget SDK, and iframe embed options
- **Deployment**: Dockerized with Coolify

## Key Features

- **AI-powered visualization**: Generate realistic images of assembled PCs from component selections
- **Product matching**: Automated SKU/EAN/MPN matching against MSI's product catalog
- **Multiple integration methods**: REST API, JavaScript SDK widget, and embeddable iframe
- **Batch processing**: Bulk product matching for catalog integrations
- **Streaming generation**: Server-Sent Events for real-time progress during image generation
- **Admin panel**: Product management, generation analytics, and API key management
- **Customer dashboard**: Self-service portal for partners to manage their builds

## Integration

Partners integrate OEMBuilder through three methods: a drop-in JavaScript SDK widget, an embeddable iframe, or direct REST API calls. This flexibility allows MSI's B2B partners to offer PC visualization in their own storefronts with minimal development effort.

## Impact

Enables MSI's B2B channel partners to showcase custom PC configurations visually, reducing pre-sales friction and improving conversion rates for custom build orders.
