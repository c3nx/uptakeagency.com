---
title: "Quix"
description: "Canlı çok oyunculu destek, gerçek zamanlı WebSocket iletişimi ve modern monorepo mimarisi ile gerçek zamanlı interaktif bilgi yarışması platformu."
tags: ["Next.js", "Express.js", "WebSocket", "Real-time", "MongoDB"]
type: "client"
featured: true
order: 4
locale: "tr"
---

## Genel Bakış

Quix, canlı çok oyunculu bilgi yarışması oturumlarına olanak tanıyan gerçek zamanlı interaktif bir bilgi yarışması platformudur. Full-stack monorepo olarak inşa edilen platform, kesintisiz gerçek zamanlı oyun deneyimi için anlık WebSocket tabanlı iletişim, modern React frontend ve sağlam bir API backend içermektedir.

## Teknik Mimari

Platform, paylaşımlı TypeScript paketleriyle Turborepo monorepo olarak inşa edilmiştir:

- **Frontend**: Next.js 15, React 19, Tailwind CSS ve veri çekme için SWR
- **Backend**: Express.js REST API, Mongoose, Pusher entegrasyonu ve Zod doğrulaması
- **Gerçek zamanlı**: Canlı yarışma olayları ve oyuncu senkronizasyonu için Sockudo WebSocket sunucusu
- **Paylaşımlı**: Tüm uygulamalar arasında ortak TypeScript tipleri, Zod şemaları ve sabitler
- **Altyapı**: Bun runtime ve statik varlıklar için Nginx ile Docker tabanlı dağıtım

## Temel Özellikler

- **Canlı çok oyunculu yarışma**: Katılımcılar arasında gerçek zamanlı soru dağıtımı ve cevap toplama
- **Anlık geri bildirim**: WebSocket destekli skor güncellemeleri ve sıralamalar
- **Yönetim paneli**: Yarışma oluşturma, soru yönetimi ve oturum analizleri
- **Ölçeklenebilir mimari**: Redis önbellekleme, MongoDB kalıcılığı ve konteynerize mikroservisler
