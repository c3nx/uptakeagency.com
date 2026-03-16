---
title: "CastHub"
description: "Kendi sunucunuzda barindirilan uzaktan yayin produksiyon izleme ve kontrol platformu. Gercek zamanli yayin sagligi izleme, OBS/vMix kontrolu ve web panosu uzerinden sunucu yonetimi."
tags: ["Real-time", "WebSocket", "React", "Broadcast", "OBS"]
type: "client"
featured: false
order: 6
locale: "tr"
---

## Genel Bakis

CastHub, kendi sunucunuzda barindirilan uzaktan yayin produksiyon izleme ve kontrol platformudur. Operatorler ve musteriler yayin sagligini izleyebilir, yayin kaynaklarini (OBS/vMix) kontrol edebilir, CleanFeed araciligiyla sunuculari yonetebilir ve platform metriklerini goruntuleyebilir - tumu bir web panosu uzerinden.

## Sorun

Musteriler yayin produksiyon bootcamp odalarini kullanmak icin baska sehirlerden seyahat etmekteydi. Fiziksel olarak bulunmadan yayin altyapisinin uzaktan izlenmesi ve kontrolu icin birlesik bir gercek zamanli platforma ihtiyac vardi.

## Cozum

CastHub'i yayin ekipmanlari (OBS/vMix), yayin platformlari (YouTube, Twitch, Kick) ve operatorler arasinda duran yalgin, gercek zamanli bir gecit olarak insa ettik. Sockudo uzerinden WebSocket tabanli iletisim kullanarak, yayin kaynaklarindaki tum durum degisiklikleri bagli panolara aninda iletilir.

## Temel Ozellikler

- **Gercek zamanli yayin izleme**: WebSocket uzerinden OBS/vMix'ten canli saglik metrikleri
- **Uzaktan yayin kontrolu**: Herhangi bir konumdan yayin baslatma/durdurma, sahne degistirme ve kaynak yonetimi
- **Coklu platform sagligi**: YouTube, Twitch ve Kick yayin durumunun esasli izlenmesi
- **Sunucu yonetimi**: Uzaktan sunucu ses beslemeleri icin CleanFeed entegrasyonu
- **Rol tabanli erisim**: Operator, musteri ve sunucu izin seviyeleriyle Google OAuth
- **Kendi sunucunuzda barindirma**: Docker tabanli dagitimla tam veri egemenlligi

## Teknik Mimari

- **Backend**: Dogrudan OBS/vMix WebSocket entegrasyonuyla Bun.serve
- **Frontend**: shadcn/ui bilesenleriyle React + Vite SPA
- **Gercek zamanli**: Sockudo (Pusher uyumlu, Rust tabanli WebSocket sunucusu)
- **Kimlik dogrulama**: E-posta tabanli rol esleme ile Google OAuth
