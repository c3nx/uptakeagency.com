---
title: "Yapay Zekaya Excel'inizi Toplatmayın"
description: "Yapay zeka tabloyu okur ve anlar, ama toplamı tahmin edebilir. Araştırmaların gösterdiği sorun ve doğru kurulum: yapay zeka anlar, hesabı kod yapar."
date: 2026-09-30
tags: ["Yapay Zeka", "Veri", "Otomasyon"]
locale: "tr"
author: "Cengiz Selçuk"
---

Sahne tanıdık: ay sonu satış tablosu bir yapay zeka sohbetine yükleniyor ve soru soruluyor: "Bu ay toplam ciro ne kadar?" Cevap birkaç saniyede, kendinden emin bir cümleyle geliyor. Rakam doğru da olabilir, yanlış da; cevaba bakarak hangisi olduğunu anlamanın bir yolu yok.

Bu yazıda nedenini sade bir dille anlatıyoruz ve şirkette yapay zekayı sayılarla birlikte nasıl güvenle kullandığımızı gösteriyoruz.

## Önce basitçe: yapay zeka okur, hesap makinesi hesaplar

ChatGPT, Gemini ya da Claude gibi araçların arkasındaki dil modelleri metinle eğitiliyor. Çok iyi okuyorlar: hangi sütunun fiyat olduğunu, hangi satırın hatalı girildiğini, kullanıcının ne sorduğunu anlıyorlar. Dağınık bir listeyi düzenliyor, eksik bilgiyi fark ediyor, uzun bir raporu özetliyorlar.

Toplama ise başka bir iş. Anthropic, Claude'un iç işleyişini incelediği araştırma yazısında bunu açıkça söylüyor: Claude bir hesap makinesi olarak tasarlanmadı, metinle eğitildi ve içinde matematik algoritmaları yok. Aynı yazı modelin yine de sayıları çoğu zaman "kafasından" doğru toplayabildiğini anlatıyor. Bize göre sorun da burada: çoğu zaman doğru, bazen yanlış; ve yanlış olduğunda bunu cevaba bakarak anlamak mümkün olmuyor.

Excel'in ya da bir muhasebe programının formülü ise her seferinde aynı girdiye aynı sonucu veriyor. Hatası varsa test edilip bulunabiliyor. Bu dünyanın adı hesaplama (İngilizcesiyle compute).

## Araştırmalar ne diyor?

- **Finans tabloları:** 2026'da yayımlanan bir çalışma (FinSheet-Bench, arXiv ön baskısı) OpenAI, Google ve Anthropic modellerini gerçek fon yapılarına göre hazırlanmış sentetik finans tablolarından bilgi çıkarma işinde denedi. En iyi model yüzde 82,4 doğrulukta kaldı; bu yaklaşık altı sorudan birinde hata demek. Tablo büyüyüp karmaştıkça doğruluk düştü: en kolay dosyada ortalama yüzde 86,2, en büyük dosyada yüzde 48,6. Araştırmacıların vardığı sonuç: hiçbir model, profesyonel finans işinde denetimsiz kullanılacak kadar düşük hata oranına ulaşmıyor; güvenilir sonuç büyük olasılıkla belgeyi anlamak ile kesin hesaplamayı birbirinden ayırmayı gerektirecek.
- **Birden çok tablo üzerinde soru-cevap:** TQA-Bench çalışması, toplama gibi birçok hücre üzerinde açık hesap gerektiren sorularda modellerin belirgin biçimde daha çok zorlandığını bildiriyor.
- **Hesabı koda devretmek:** 2022 tarihli PAL çalışması, modellerin problemi doğru adımlara bölse bile çözüm adımında mantık ve aritmetik hatası yaptığını gösterdi. Önerdiği çözüm, hesap adımını bir Python yorumlayıcısına bırakmak.

Microsoft da kendi ürünü için aynı uyarıyı yapıyor. Excel'deki Copilot'un sık sorulan sorular sayfasında Copilot'un bazen hata yapabileceği, bilgiyi yanlış yorumlayabileceği ya da yanlış sonuç üretebileceği yazıyor; Copilot'un ürettiği her şeyin kullanılmadan önce gözden geçirilmesi ve doğrulanması isteniyor.

## Doğru kurulum: yapay zeka anlar, hesabı kod yapar

Yapay zekayı sayılardan uzak tutmak gerekmiyor; iki işi birbirinden ayırmak yetiyor. Kurduğumuz sistemlerde işbölümü şöyle:

- **Yapay zeka anlıyor:** kullanıcının sorusunu, hangi tablonun hangi sütununa bakılacağını, hangi kaydın şüpheli olduğunu.
- **Hesabı kod yapıyor:** toplam, kur çevirisi, kâr marjı, stok. Yapay zeka bu hesabı bir araç olarak çağırıyor; sonucu kendisi üretmiyor.
- **Sonucu yine kod denetliyor:** toplamlar tutuyor mu, rakam beklenen aralıkta mı.
- **Önemli kararlarda insan onay veriyor.**

Büyük yapay zeka şirketleri de bu yapıyı araç olarak sunuyor. OpenAI'nin kod yorumlayıcısı modelin Python kodu yazıp çalıştırmasına izin veriyor ve veri analizi ile matematik işleri için tanıtılıyor. Google'ın Gemini tarafındaki kod çalıştırma aracı da aynı mantıkla çalışıyor: model kodu yazıyor, çalıştırıyor, çıkan sonuca göre cevabını kuruyor.

## Gerçek bir örnek: Estanbul'da "geçen ay kafe ne kadar kazandı?"

Estanbul, İstanbul'da bir espor ve oyun merkezi ile kafe işletmesi. Kurduğumuz şirket zekası sisteminde bütün satış ve maliyet verisi her gece tek bir veri ambarında (bütün verinin toplandığı ortak depo) birleşiyor. Yönetici, yazarak ya da sesli olarak bir yapay zeka analistine soru soruyor.

"Geçen ay kafe ne kadar kazandı?" diye sorulduğunda rakamı yapay zeka tahmin etmiyor. Soruyu veri ambarında çalışacak bir sorguya çeviriyor; toplamayı o sorgu yapıyor. Yapay zeka sorgunun sonucunu alıp anlaşılır bir cümleyle anlatıyor. Üstelik veriye yalnız okuma izniyle erişiyor, hiçbir kaydı değiştiremiyor.

## Kısa kontrol listesi

- **Rakamı kim üretiyor?** Cevaptaki sayı bir formülden, sorgudan ya da koddan mı geliyor, yoksa modelin kendi cümlesinden mi? İkincisiyse o rakam doğrulanmadan karar verilmemeli.
- **Hesap tekrarlanabiliyor mu?** Aynı soru iki kez sorulduğunda aynı rakam gelmeli. Gelmiyorsa hesap koda taşınmalı.
- **Kontrol var mı?** Toplamların tutup tutmadığını kontrol eden ayrı bir adım olmalı.
- **Kim onaylıyor?** Parayla ilgili kararların son adımında bir insan olmalı.

Şirkette yapay zekanın nerede işe yarayacağını ve sayıların nerede koda bırakılması gerektiğini birlikte bulmak için: [Yapay Zeka Danışmanlığı](/tr/services/ai-consulting).

## Kaynaklar

- Anthropic, "Tracing the thoughts of a large language model" (27 Mart 2025): https://www.anthropic.com/research/tracing-thoughts-language-model
- FinSheet-Bench, arXiv 2603.07316 (Mart 2026): https://arxiv.org/abs/2603.07316
- TQA-Bench, arXiv 2411.19504 (Kasım 2024): https://arxiv.org/abs/2411.19504
- Gao ve arkadaşları, "PAL: Program-aided Language Models", arXiv 2211.10435: https://arxiv.org/abs/2211.10435
- Microsoft, Excel'de Copilot hakkında sık sorulan sorular: https://support.microsoft.com/en-us/excel/copilot/frequently-asked-questions-about-copilot-in-excel
- OpenAI, kod yorumlayıcı: https://developers.openai.com/api/docs/guides/tools-code-interpreter
- Google, Gemini kod çalıştırma: https://ai.google.dev/gemini-api/docs/code-execution
