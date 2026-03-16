---
title: "Quix"
description: "Canli cok oyunculu destek, gercek zamanli WebSocket iletisimi ve modern monorepo mimarisi ile gercek zamanli interaktif bilgi yarismasi platformu."
tags: ["Next.js", "Express.js", "WebSocket", "Real-time", "MongoDB"]
type: "client"
featured: true
order: 4
locale: "tr"
---

## Genel Bakis

Quix, canli cok oyunculu bilgi yarismasi oturumlarina olanak taniyan gercek zamanli interaktif bir bilgi yarismasi platformudur. Full-stack monorepo olarak insa edilen platform, kesintisiz gercek zamanli oyun deneyimi icin anlik WebSocket tabanli iletisim, modern React frontend ve saglam bir API backend icermektedir.

## Teknik Mimari

Platform, paylasimli TypeScript paketleriyle Turborepo monorepo olarak insaa edilmistir:

- **Frontend**: Next.js 15, React 19, Tailwind CSS ve veri cekme icin SWR
- **Backend**: Express.js REST API, Mongoose, Pusher entegrasyonu ve Zod dogrulamasi
- **Gercek zamanli**: Canli yarisma olaylari ve oyuncu senkronizasyonu icin Sockudo WebSocket sunucusu
- **Paylasimli**: Tum uygulamalar arasinda ortak TypeScript tipleri, Zod semalari ve sabitler
- **Altyapi**: Bun runtime ve statik varliklar icin Nginx ile Docker tabanli dagitim

## Temel Ozellikler

- **Canli cok oyunculu yarisma**: Katilimcilar arasinda gercek zamanli soru dagitimi ve cevap toplama
- **Anlik geri bildirim**: WebSocket destekli skor guncellemeleri ve siralamalar
- **Yonetim paneli**: Yarisma olusturma, soru yonetimi ve oturum analizleri
- **Olceklenebilir mimari**: Redis onbellekleme, MongoDB kaliciligi ve konteynerize mikroservisler
