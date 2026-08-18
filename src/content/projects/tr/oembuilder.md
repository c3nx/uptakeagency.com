---
title: "OEMBuilder"
description: "MSI için seçilen bileşen parçalardan yapay zeka kullanarak fotorealistik monte edilmiş PC görselleri üreten B2B PC yapı görselleştirme hizmeti."
tags: ["AI", "Gemini", "Python", "FastAPI", "MSI"]
type: "client"
featured: true
order: 5
locale: "tr"
---

## Genel Bakış

OEMBuilder, MSI için geliştirilen ve Google'ın Gemini AI'sini kullanarak seçilen MSI bileşenlerinden monte edilmiş PC yapılarının fotorealistik görsellerini üreten bir B2B hizmetidir. Ortaklar ve bayiler, fiziksel montajdan önce özel PC yapılandırmalarını görselleştirebilir, satış ve yapılandırma sürecini kolaylaştırır.

## Teknik Yapı

- **Yapay Zeka Görsel Üretimi**: Fotorealistik PC yapı görselleştirmesi için Google Gemini 3 Pro
- **Backend**: PostgreSQL ile Python FastAPI
- **Entegrasyon**: REST API, JavaScript Widget SDK ve iframe gömme seçenekleri
- **Dağıtım**: Coolify ile Docker tabanlı

## Temel Özellikler

- **Yapay zeka destekli görselleştirme**: Bileşen seçimlerinden gerçekçi monte edilmiş PC görselleri üretme
- **Ürün eşleştirme**: MSI'ın ürün kataloğuyla otomatik SKU/EAN/MPN eşleştirme
- **Çoklu entegrasyon yöntemi**: REST API, JavaScript SDK widget ve gömülebilir iframe
- **Toplu işleme**: Katalog entegrasyonları için toplu ürün eşleştirme
- **Akışlı üretim**: Görsel üretimi sırasında gerçek zamanlı ilerleme için Server-Sent Events
- **Yönetim paneli**: Ürün yönetimi, üretim analizleri ve API anahtar yönetimi

## Etki

MSI'ın B2B kanal ortaklarının özel PC yapılandırmalarını görsel olarak sergilemesini sağlayarak, satış öncesi sürtünmeyi azaltır ve özel yapı siparişleri için dönüşüm oranlarını arttırır.
