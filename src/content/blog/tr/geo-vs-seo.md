---
title: "GEO Nedir? SEO ve AEO'dan Farkı"
description: "GEO, sitenin ChatGPT, Gemini ve Google'ın yapay zeka modunun cevaplarında kaynak olarak seçilmesi için yapılan iş. SEO ve AEO ile farkı, işe yarayanlar."
date: 2026-09-30
tags: ["GEO", "SEO", "AEO", "Yapay Zeka"]
locale: "tr"
author: "Cengiz Selçuk"
---

GEO (üretken motor optimizasyonu), sitemizin ChatGPT, Gemini, Perplexity ya da Google'ın yapay zeka modu gibi araçların verdiği cevaplarda kaynak olarak seçilmesi için yapılan iş. SEO'nun hedefi arama sonuçlarında üst sıraya çıkmak; GEO'nun hedefi, yapay zekanın cevabı hazırlarken bizim sayfamızı okuyup alıntılaması.

Bu yazıda üç terimi sadeleştiriyoruz, araştırmanın bugün ne söylediğine bakıyoruz ve kendi sitemizde yaptığımız bir ölçümü paylaşıyoruz.

## Önce basitçe: üç terim, üç farklı ekran

Birinin aklına bir soru geldiğini düşünelim: "Şirketim için yapay zeka danışmanı nasıl seçerim?"

- **Google'a yazarsa** karşısına on bağlantı çıkıyor. Hangi sitenin üstte olduğu SEO'nun (arama motoru optimizasyonu) konusu.
- **Google sorunun cevabını listenin üstünde kısa bir kutuda verirse**, ya da telefondaki sesli asistan cevabı okursa, kişi çoğu zaman hiçbir siteye tıklamıyor. O kısa cevabın bizim sayfamızdan alınması için yapılan işe AEO (cevap motoru optimizasyonu) deniyor.
- **ChatGPT'ye ya da Google'ın yapay zeka moduna sorarsa** uzun, derlenmiş bir cevap alıyor; cevabın altında ya da içinde birkaç kaynak gösteriliyor. O kaynaklardan biri olmak GEO'nun konusu.

Üçünün arkasında aynı soru var: bu sayfa okunabiliyor mu, soruya net cevap veriyor mu, güvenilir mi?

## GEO terimi nereden çıktı?

Terim, Kasım 2023'te yayımlanan ve KDD 2024 konferansına kabul edilen bir akademik çalışmadan geliyor: Aggarwal ve arkadaşlarının "GEO: Generative Engine Optimization" makalesi. Araştırmacılar bir test ortamı kurup sayfalarda yapılan değişikliklerin yapay zeka cevaplarındaki görünürlüğü nasıl etkilediğini ölçtüler.

Öne çıkan bulgular:

- **Kaynak göstermek, alıntı eklemek ve istatistik eklemek** en çok işe yarayan yöntemler oldu. Makalenin özeti bu yöntemlerle görünürlüğün yüzde 40'a kadar artabildiğini söylüyor.
- **Anahtar kelime doldurmak** (aynı kelimeyi metne tekrar tekrar serpiştirmek) neredeyse hiç işe yaramadı; bir testte başlangıç düzeyinin de altında kaldı.
- **Sıralamada geride olan siteler** bu yöntemlerden daha çok kazandı. Google'da beşinci sırada olan bir sitenin kaynak eklendikten sonra yapay zeka cevaplarındaki görünürlüğü iki katını aştı.
- Etki konudan konuya değişiyor.

Burada dikkatli olmak gerekiyor: "yüzde 40'a kadar" bir test ortamında ölçülen en iyi sonuç, her siteye verilmiş bir söz değil. Yine de yön net: yapay zeka, kendisi de kaynağa dayanan, somut bilgi veren metni alıntılamayı tercih ediyor.

## Google ne diyor?

Google, yapay zeka özetleri ve yapay zeka modu için site sahiplerine resmi bir rehber yayımladı. Rehberin özü kısa:

- Bu özelliklerde görünmek için **ek bir gereksinim ya da özel bir optimizasyon yok**; SEO'nun bilinen iyi uygulamaları geçerli.
- Bir sayfanın kaynak olarak gösterilebilmesi için **Google'ın dizininde olması ve arama sonuçlarında açıklamasıyla gösterilebilir olması** gerekiyor.
- Bu özellikler için **yeni bir makine okunur dosya ya da özel yapılandırılmış veri eklemek gerekmiyor.**

Son madde, son dönemde çok konuşulan llms.txt dosyası (yapay zeka araçlarına siteyi özetleyen bir metin dosyası önerisi) için de önemli: Google, yapay zeka özelliklerinde görünmek için böyle bir dosyaya gerek olmadığını söylüyor. Google'daki görünürlüğü böyle bir dosyanın üzerine kurmamak gerekiyor.

AEO tarafında da Google'ın söylediği benzer. Sonuç listesinin üstündeki kısa cevap kutularını (öne çıkan snippet) Google'ın sistemleri kendisi seçiyor; bir sayfayı "bunu seç" diye işaretlemenin yolu yok. Sık sorulan sorular için eklenen özel işaretleme ise Ağustos 2023'ten beri yalnız tanınmış devlet ve sağlık sitelerinde zengin sonuç olarak gösteriliyor. Yani AEO'da da iş, soruyu net cevaplayan iyi bir sayfa yazmaya dönüyor.

## Botlara kapıyı açık tutmak

Yapay zeka araçlarının sitemizi okuyabilmesi için önce içeri girebilmesi gerekiyor. Burada sık yapılan bir karışıklık var: aynı şirketin birden fazla botu olabiliyor ve bunlar farklı işler yapıyor.

- **OpenAI:** OAI-SearchBot, siteleri ChatGPT'nin arama sonuçlarında göstermek için geliyor; GPTBot ise modellerin eğitimi için. OpenAI, arama sonuçlarında görünmek isteyenlere OAI-SearchBot'a izin vermeyi öneriyor.
- **Anthropic:** Claude-SearchBot arama kalitesi için, ClaudeBot eğitim için.
- **Perplexity:** PerplexityBot, siteleri Perplexity'nin arama sonuçlarında göstermek için; Perplexity'ye göre model eğitimi için kullanılmıyor.
- **Google:** Google-Extended, sitenin içeriğinin Gemini modellerinin eğitiminde kullanılıp kullanılmayacağını belirliyor. Google'a göre bu ayar sitenin Google Arama'da yer almasını etkilemiyor.

Pratik sonuç: eğitim botlarını kapatmak bir tercih meselesi; arama botlarını kapatmak ise sitenin o araçların cevaplarına hiç girmemesi demek. Bu ayrımı robots.txt dosyasında bilerek yapmak gerekiyor.

## Kendi sitemizde ölçtük: bugün yokuz

30 Eylül 2026'da Google'ın yapay zeka moduna dört soru sorduk:

- "İstanbul'da yapay zeka danışmanlığı veren firmalar hangileri?"
- "Türkiye'de GEO hizmeti veren ajanslar hangileri?"
- "SEO ile GEO arasındaki fark nedir?"
- "Kurumsal şirketler için yapay zeka danışmanlığı alırken nelere dikkat edilmeli?"

Dört cevabın hiçbirinde Uptake geçmiyor. GEO ajansları sorusunun cevabında on ajans adı sayılıyor; danışmanlık sorusunun cevabı büyük danışmanlık firmalarıyla başlıyor. Cevapların önemli bir kısmı ajansların kendi yazılarından ve "en iyi ajanslar" türünden liste sayfalarından derlenmiş görünüyor.

Buradan çıkardığımız iki şey var. Birincisi, yapay zeka yeni bir siteyi kendiliğinden bulmuyor; başka sitelerin, listelerin ve dizinlerin bizden söz etmesi gerekiyor. İkincisi, soruya doğrudan cevap veren yazılar alıntılanıyor; bu yazı da o yüzden var.

Aynı dört soruyu 23 Kasım 2026'da tekrar soracağız ve sonucu burada paylaşacağız.

## Kısa kontrol listesi

- **Google sayfayı görebiliyor mu?** Sayfa dizinde mi, arama sonucunda açıklamasıyla görünüyor mu? GEO'nun ilk şartı bu.
- **Arama botları içeri girebiliyor mu?** robots.txt dosyası OAI-SearchBot, Claude-SearchBot ve PerplexityBot'u engellemiyor olmalı.
- **Cevap ilk paragrafta mı?** Sayfanın cevapladığı soru ilk birkaç cümlede, alıntılanabilecek kadar kısa ve net cevaplanmalı; ayrıntı sonra gelmeli.
- **Kaynak ve rakam var mı?** Araştırma, kaynağı belli bilgi ve istatistik içeren metnin daha çok alıntılandığını gösteriyor. Kaynaksız rakam ise güveni bozuyor.
- **Başka siteler bizden söz ediyor mu?** Sektör listeleri, dizinler ve başka sitelerdeki bağlantılar hem Google'da hem yapay zeka cevaplarında işe yarıyor.
- **Ölçüyor muyuz?** Hedef soruları belli aralıklarla yapay zeka araçlarına sorup kimin kaynak gösterildiğine bakmak gerekiyor.

## Kaynaklar

- Aggarwal ve arkadaşları, "GEO: Generative Engine Optimization", arXiv 2311.09735 (Kasım 2023, KDD 2024): https://arxiv.org/abs/2311.09735
- Google Search Central, "AI features and your website": https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, öne çıkan snippet'ler: https://developers.google.com/search/docs/appearance/featured-snippets
- Google Search Central Blog, SSS ve nasıl yapılır sonuçlarındaki değişiklik (8 Ağustos 2023): https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google tarayıcıları ve Google-Extended: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- OpenAI botları: https://developers.openai.com/api/docs/bots
- Anthropic tarayıcıları: https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Perplexity botları: https://docs.perplexity.ai/guides/bots

Sitenin Google'da ve yapay zeka cevaplarında bugün nerede durduğunu birlikte ölçmek için: [SEO, GEO ve AEO Danışmanlığı](/tr/services/seo-geo).
