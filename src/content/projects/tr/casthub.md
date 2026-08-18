---
title: "CastHub"
description: "Kendi sunucunuzda barındırılan uzaktan yayın prodüksiyon izleme ve kontrol platformu. Gerçek zamanlı yayın sağlığı izleme, OBS/vMix kontrolü ve web panosu üzerinden sunucu yönetimi."
tags: ["Real-time", "WebSocket", "React", "Broadcast", "OBS"]
type: "client"
featured: false
order: 6
locale: "tr"
---

## Genel Bakış

CastHub, kendi sunucunuzda barındırılan uzaktan yayın prodüksiyon izleme ve kontrol platformudur. Operatörler ve müşteriler yayın sağlığını izleyebilir, yayın kaynaklarını (OBS/vMix) kontrol edebilir, CleanFeed aracılığıyla sunucuları yönetebilir ve platform metriklerini görüntüleyebilir - tümü bir web panosu üzerinden.

## Sorun

Müşteriler yayın prodüksiyon bootcamp odalarını kullanmak için başka şehirlerden seyahat etmekteydi. Fiziksel olarak bulunmadan yayın altyapısının uzaktan izlenmesi ve kontrolü için birleşik bir gerçek zamanlı platforma ihtiyaç vardı.

## Çözüm

CastHub'ı yayın ekipmanları (OBS/vMix), yayın platformları (YouTube, Twitch, Kick) ve operatörler arasında duran yalın, gerçek zamanlı bir geçit olarak inşa ettik. Sockudo üzerinden WebSocket tabanlı iletişim kullanarak, yayın kaynaklarındaki tüm durum değişiklikleri bağlı panolara anında iletilir.

## Temel Özellikler

- **Gerçek zamanlı yayın izleme**: WebSocket üzerinden OBS/vMix'ten canlı sağlık metrikleri
- **Uzaktan yayın kontrolü**: Herhangi bir konumdan yayın başlatma/durdurma, sahne değiştirme ve kaynak yönetimi
- **Çoklu platform sağlığı**: YouTube, Twitch ve Kick yayın durumunun esaslı izlenmesi
- **Sunucu yönetimi**: Uzaktan sunucu ses beslemeleri için CleanFeed entegrasyonu
- **Rol tabanlı erişim**: Operatör, müşteri ve sunucu izin seviyeleriyle Google OAuth
- **Kendi sunucunuzda barındırma**: Docker tabanlı dağıtımla tam veri egemenliği

## Teknik Mimari

- **Backend**: Doğrudan OBS/vMix WebSocket entegrasyonuyla Bun.serve
- **Frontend**: shadcn/ui bileşenleriyle React + Vite SPA
- **Gerçek zamanlı**: Sockudo (Pusher uyumlu, Rust tabanlı WebSocket sunucusu)
- **Kimlik doğrulama**: E-posta tabanlı rol eşleme ile Google OAuth
