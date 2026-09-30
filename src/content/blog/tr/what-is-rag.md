---
title: "RAG Nedir? Yapay Zekaya Şirketin Belgelerini Okutmak"
description: "RAG nedir: yapay zeka, cevabı şirketin belgelerinden bulduğu parçaya dayandırarak yazar. Nasıl çalışır, sınırları, başlamadan önce kontrol listesi."
date: 2026-09-30
tags: ["Yapay Zeka", "RAG", "Yapay Zeka Entegrasyonu"]
locale: "tr"
author: "Cengiz Selçuk"
---

RAG (İngilizce açılımı Retrieval-Augmented Generation, Türkçesi "getirmeyle güçlendirilmiş üretim"), yapay zekanın cevabı yazmadan önce şirketin belgeleri arasından ilgili parçaları bulup cevabı onlara dayandırması yöntemi. Yapay zeka aklından cevap vermek yerine, önündeki belgeyi okuyup cevap veriyor. Bu sayede cevap şirketin kendi bilgisine dayanıyor ve hangi belgeden geldiği gösterilebiliyor.

Bu yazıda RAG'in nasıl çalıştığını, nerede işe yarayıp nerede yaramadığını ve şirkette başlamadan önce neye bakılması gerektiğini sade bir dille anlatıyoruz.

## Önce basitçe: yapay zeka şirketin belgelerini bilmiyor

Sahne tanıdık: yeni başlayan bir çalışan, iade süreciyle ilgili prosedürü arıyor. Belge paylaşım klasörlerinden birinde, geçen yıl güncellenmiş bir PDF olarak duruyor ama kimse tam yerini hatırlamıyor. Çalışan sonunda bir genel yapay zeka sohbetine soruyor. Cevap akıcı ve kendinden emin geliyor, ama şirketin prosedürünü değil, genel olarak "iade süreçlerinin nasıl işlediğini" anlatıyor. Model şirketin belgesini hiç görmedi, o yüzden görmediği bir şeyi tahmin ediyor.

RAG bu boşluğu kapatmak için var. Açık kitap sınavı benzetmesi işe yarıyor: kapalı kitap sınavında öğrenci bildiğini ezberden yazar, açık kitap sınavında önce kitapta ilgili sayfayı bulur, sonra cevabı o sayfaya bakarak yazar. RAG yapay zekayı ikinci öğrencinin durumuna sokuyor.

Adın kaynağı, Patrick Lewis ve arkadaşlarının 2020 tarihli makalesi. Makale, önceden eğitilmiş bir dil modelini (bilginin modelin kendi içinde durduğu kısım) harici bir belge arşiviyle (bir arama mekanizmasıyla erişilen kısım; makalede bu arşiv Wikipedia'nın vektör dizini, şirket belgeleri değil) birleştiren modellere "RAG" adını veriyor. Yazarlar, modellerin bilgiyi kendi içlerinde tuttuğunda kararlarının kaynağını göstermenin ve bilgisini güncellemenin hâlâ çözülmemiş sorunlar olduğunu belirtiyor.

## Nasıl çalışır?

Arka planda dört adım var.

1. **Belgeleri hazırlamak.** Şirketin belgeleri (PDF, Word dosyaları, wiki sayfaları, e-postalar) toplanıyor ve küçük parçalara bölünüyor. Buna parçalama diyoruz: iki yüz sayfalık bir kılavuzu bir bütün olarak aramak zor, birkaç paragraflık parçalara bölünce aranabilir hâle geliyor.
2. **Parçalara anlam kodu vermek.** Her parça, anlamını temsil eden bir sayı dizisine çevriliyor. Buna gömme (İngilizcesiyle embedding) deniyor. Mantığı şu: anlamca birbirine yakın metinlerin sayı dizileri de birbirine yakın çıkıyor. "İade nasıl yapılır?" ile "Ürün geri gönderme adımları" aynı kelimeleri paylaşmasa da yakın dizilere dönüşüyor.
3. **Soruya en yakın parçaları bulmak.** Biri soru sorduğunda soru da aynı biçimde sayı dizisine çevriliyor ve arşivdeki en yakın parçalar aranıyor. Bu aramaya vektör arama denir (sayı dizisine vektör diyoruz). Klasik aramadan farkı, kelimenin kendisine değil anlama bakması.
4. **Cevabı o parçalara dayanarak yazmak.** Bulunan birkaç parça, soruyla birlikte yapay zekaya veriliyor ve "yalnız bunlara dayanarak cevapla, kaynağı göster" deniyor. Yapay zeka cevabı yazıyor; cevabın yanında hangi belgeden geldiği de görünüyor.

Yani yapay zeka şirketin bütün arşivini ezberlemiyor. Her soruda arşivden ilgili birkaç sayfayı önüne alıyor.

## Ne zaman işe yarar?

RAG, cevabın şirketin kendi metinlerinde yazılı olduğu durumlarda anlamlı:

- Yeni çalışanların ya da destek ekibinin prosedürleri, sözleşme maddelerini, ürün kılavuzlarını sorduğu iç asistanlar.
- Belge sayısı çok, ama sorulan şeyin cevabı genelde birkaç paragrafta olan işler.
- Belgeler sık güncelleniyorsa: arşive yeni belge eklendiğinde asistan bir sonraki soruda onu da görüyor, modeli yeniden eğitmek gerekmiyor.

## Ne zaman yaramaz? Sınırları

- **Belge kötüyse cevap da kötü olur.** Eski, çelişkili ya da yarım belgeler arşivdeyse asistan onlara dayanarak cevap veriyor. RAG belgeleri düzeltmiyor; belgelerin düzeni çoğu zaman projenin asıl işi oluyor.
- **Yanlış parça bulunursa cevap yine yanlış olabilir.** Arama soruyla ilgisiz bir parçayı öne çıkarırsa model o parçaya bakarak makul görünen ama yanlış bir cevap yazabiliyor. Bu yüzden kaynağın cevapla birlikte gösterilmesi ve birinin gerektiğinde açıp kontrol edebilmesi şart.
- **Sayısal toplama ve hesap RAG'in işi değil.** "Geçen çeyrekte toplam kaç sipariş vardı?" sorusu belge okuyarak değil, hesaplayarak cevaplanır. Modelin toplamayı tahmin ettiği durumu ayrı bir yazıda anlattık: [Yapay Zekaya Excel'inizi Toplatmayın](/tr/blog/ai-and-computation).
- **Cevabı hiçbir belgede yazmayan sorular.** Arşivde olmayan bir bilgiyi soran kullanıcıya asistanın "bulamadım" demesi gerekiyor. Bunu baştan tasarlamak ve denemek lazım.

## RAG ile modeli yeniden eğitmek arasındaki fark

Modeli yeniden eğitmeye (ince ayar, İngilizcesiyle fine-tuning) şöyle bakılabilir: çalışana aylarca süren bir eğitim vermek. Bilgi çalışanın kafasına yerleşiyor, ama bilgi değiştiğinde eğitimi tekrarlamak gerekiyor ve çalışan bilgiyi nereden öğrendiğini söyleyemiyor.

RAG ise çalışanın masasına bir kılavuz koymak. Kılavuz değişince çalışan yeni sayfayı okuyor; cevap verirken hangi sayfaya baktığını da gösterebiliyor. Şirket belgeleri sık değiştiği ve cevabın kaynağının görünmesi istendiği için çoğu iç asistan işinde RAG daha uygun bir başlangıç. İnce ayar daha çok modelin üslubunu ya da belirli bir işi yapış biçimini değiştirmek istediğimizde gündeme geliyor; iki yöntem birbirinin yerine geçmiyor, gerekirse birlikte de kullanılabiliyor.

## Yetki ve veri sınırı

Şirkette herkes her belgeyi görmüyor: maaş tabloları insan kaynaklarının, sözleşme taslakları hukukun. Yapay zeka asistanı bütün arşive erişirse, yetkisi olmayan birinin sorusuna yetkisi olmayan belgeden cevap verebilir. Kural basit: kim hangi belgeyi görebiliyorsa, yapay zeka da o kişiye yalnız onu göstermeli. Arama adımında, bulunan parçalar kullanıcının yetkisine göre süzülmeli.

Bunun bir örneği Estanbul'da var. Estanbul, İstanbul'da bir espor ve oyun merkezi ile kafe işletmesi; kurduğumuz şirket zekası sisteminde yazılı ve sesli bir yapay zeka analisti çalışıyor. Bu sistem belge tabanlı bir RAG değil: analist soruyu veri ambarında bir sorguya çeviriyor. Ama yapay zekaya hangi verinin gideceğini baştan sınırlama ilkesi aynı. Sistemde üç rol ve on üç ayrı yetki tanımlı, yapay zeka veriye yalnız okuma izniyle erişiyor ve müşterilerin kişisel bilgisi (isim, telefon, e-posta, kullanıcı adı) yapay zekanın eriştiği veriye hiçbir aşamada taşınmıyor. Sınırı sistem kurulurken çiziyoruz.

## Başlamadan önce kısa kontrol listesi

- **Belgeler nerede?** Paylaşım klasörü, e-posta, kişisel bilgisayar, kâğıt arşiv: önce bir envanter gerekiyor.
- **Güncel mi?** Aynı prosedürün üç sürümü duruyorsa hangisinin geçerli olduğu belli olmalı.
- **Kim neyi görebilir?** Yetki kuralları belgelere baştan bağlanmalı, sonradan eklemek zor.
- **Cevap kaynağını gösteriyor mu?** Her cevapta hangi belgeden geldiği görünmeli, böylece kullanıcı doğrulayabilir.
- **Doğruluk nasıl ölçülecek?** Cevabı bilinen bir deneme soru listesi hazırlanıp asistan her değişiklikten sonra bu listeyle denenmeli.

Belgelerin bu işe uygun olup olmadığına ve yapay zekanın şirkette nerede işe yarayacağına birlikte bakmak için: [Yapay Zeka Danışmanlığı](/tr/services/ai-consulting).

## Kaynaklar

- Lewis ve arkadaşları, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", arXiv 2005.11401 (Mayıs 2020): https://arxiv.org/abs/2005.11401
