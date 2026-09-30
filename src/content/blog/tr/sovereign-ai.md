---
title: "Egemen Yapay Zeka: Verimiz Nereye Gidiyor?"
description: "Yapay zekayı şirkete sokarken verinin ve rekabet avantajının kontrolü kimde kalıyor? Egemen yapay zekada bakılacak dört başlık ve nereden başlanacağı."
date: 2026-09-30
tags: ["Yapay Zeka", "Veri Güvenliği", "Strateji"]
locale: "tr"
author: "Cengiz Selçuk"
---

Yönetim toplantısında bir yapay zeka pilotu sunuluyor. Satış sözleşmeleri, fiyat listeleri ve müşteri yazışmaları modele verilecek. Masadan biri soruyor: "Bu veri nereye gidiyor? Sağlayıcı bununla kendi modelini eğitiyor mu?" Gelen cevap "güvenlik önlemlerimiz var" oluyor. Soru cevapsız kalıyor, pilot da bekliyor.

## Önce basitçe: egemen yapay zeka ne demek?

Egemen yapay zeka, şirketin yapay zekayı kullanırken kendi verisi ve rekabet avantajı üzerindeki kontrolü elinde tutması demek. Rekabet avantajı, şirketin rakibinden farklı yaptığı iş: fiyatlama mantığı, tedarikçi ilişkileri, müşteriyi tanıma biçimi. Yapay zekaya verilen belgeler ve tablolar bunların hepsini taşıyor.

Egemenlik, her şeyi kendi sunucusunda çalıştırmak zorunda olmak anlamına gelmiyor. Şirket verinin kime gittiğini, ne için kullanılacağını ve gerektiğinde nasıl geri alınacağını bilmeli ve bunu kendisi belirlemeli.

Palantir'in kurucu ortağı ve CEO'su Alex Karp, Palantir'in açık modeller ve ontoloji katmanıyla kurduğu yığına "sovereign stack" (egemen yığın) diyor. Palantir ile NVIDIA'nın 10 Eylül 2026 tarihli ortak duyurusu bu yığını egemen yapay zeka başlığı altında sunuyor. Duyuruya göre kuruluş kendi verisinin kontrolünü ve sahipliğini, modeli ve çalışma ortamı üzerinde de kontrolü elinde tutuyor. Bu yazı Palantir'in ürününü önermiyor, ilkeyi her ölçekteki şirket için anlatıyor. The Next Web bu duyuruyu değerlendirirken şuna dikkat çekiyor: veri içeriğinin sahipliği şirkette kalsa bile o veriyi yapılandıran ontolojiye, modellere, yazılıma ve donanıma bağımlılık sürebilir.

## Neden önemli?

Yapay zekanın işe yaraması için şirketin gerçek verisini görmesi gerekiyor. Aynı veri şirketin en değerli varlıklarından biri. Bir sağlayıcının veriyle ne yaptığı (kaydı tutmak, model eğitmek, üçüncü tarafla paylaşmak) sözleşmesinde yazıyor ve her sağlayıcıda farklı. Hazır bir cevap yok; her sağlayıcının kendi metnini okumak gerekiyor.

## Dört bileşen

Aşağıdaki dört başlığı biz derledik; duyurularda böyle bir liste yok.

1. Veri sahipliği: Şirketin verisi, sağlayıcının modelini eğitmek ya da geliştirmek için kullanılmamalı. Bunun güvencesi sözlü değil, yazılı olmalı.
2. Bağımsız altyapı: Modelin nerede çalıştığı, verinin hangi bölgede durduğu ve sağlayıcı değişirse ne olacağı şirketçe bilinmeli.
3. Model esnekliği: Tek bir kapalı modele bağlı kalınmamalı. Ağırlıkları indirilip şirketin kendi ortamında çalıştırılabilen açık ağırlıklı modeller de seçenekler arasında olmalı; iş için hangisi uygunsa o kullanılmalı.
4. Sözleşme ve hukuki farkındalık: Sözleşme, veri sızıntısına ya da fikri mülkiyetin istemeden devrine kapı aralıyor mu? Kişisel veriler söz konusuysa KVKK (Kişisel Verilerin Korunması Kanunu) gereklilikleri karşılanıyor mu?

## Ontoloji katmanı: şirketin iş yapış biçimi

Ontoloji sözcüğü felsefeden geliyor: var olan şeylerin ve aralarındaki ilişkilerin tanımı. Şirket bağlamında bu, şirkete özgü iş yapış biçiminin yapay zekanın okuyabileceği bir yapıya yazılması demek: hangi kayıt neyi anlatıyor, hangi kavram hangisiyle bağlantılı, hangi kural nerede geçerli, hangi veriyi kim görebilir.

Bu katmanın iki işi var. Birincisi, modelin şirketi doğru anlamasını sağlamak. Model ham tabloya bakınca tahmin yürütür; yapıyı bilince hangi sütunun neyi anlattığını tahmin etmek zorunda kalmaz. İkincisi, sınırları çizmek: modele hangi verinin gideceği ve neyin gitmeyeceği bu katmanda belirleniyor. Model veriyi sahiplenmiyor, şirketin tanımladığı çerçevede kullanıyor. Şirketin bilgisi yalnız kişilerin kafasında değil bu katmanda da durursa, bir çalışan ayrıldığında hepsi onunla gitmez.

## Bir yelpaze: nereden başlanır?

Egemen yapay zeka bir yelpaze. Uç noktası herkes için doğru olmayabilir.

İlk adım veri sınırlarını çizmek: hangi veri yapay zekaya gidecek, hangisi gitmeyecek, kim neyi görecek. Sonraki adımlar sağlayıcı seçimi ve sözleşme, model esnekliği ve altyapı bağımsızlığı. En uç nokta, modeli şirketin kendi altyapısında çalıştırmak. NVIDIA'nın 29 Haziran 2026 tarihli bir yazısı bunun bir örneğini anlatıyor: Palantir'in ABD kamu kurumları için tanıttığı yeni motorla kurumlar özelleştirilmiş açık modelleri kendi altyapılarında çalıştırabiliyor, kendi verileriyle eğitebiliyor ve ortaya çıkan modelin ağırlıklarının tam sahipliğini koruyabiliyor. Bu kurulum ciddi bir yatırım gerektiriyor; her şirketin ilk adımı değil.

Yelpazenin ilk adımına Estanbul iyi bir örnek. İstanbul'da bir espor ve oyun merkezi ile kafe işletmesi olan Estanbul'da şirket zekası sistemini kurduk. Veri oyun merkezi yazılımından, kafe kasa sisteminden, franchise maliyet sisteminden ve iç veritabanlarından elle giriş olmadan geliyor ve her gece tek bir veri ambarında birleşiyor. Ambar Avrupa Birliği bölgesinde duruyor. Üç rol ve on üç ayrı yetki tanımlı. Yazarak ya da sesle soru sorulan yapay zeka analisti veriye yalnız okuma izniyle erişiyor. Müşterilerin kişisel bilgisi (isim, telefon, e-posta, kullanıcı adı) yapay zekanın eriştiği veriye hiçbir aşamada taşınmıyor.

Burada yapay zeka bir bulut hizmetinde çalışıyor, yani model şirketin kendi sunucusunda koşmuyor. Bu bir kontrollü veri sınırı: yapay zekaya yalnız izin verilen veri ulaşıyor. Bir işletme için doğru başlangıç çoğu zaman bu.

## Sağlayıcıya sorulacaklar

- Şirketin verisi, modelin eğitiminde ya da geliştirilmesinde kullanılıyor mu? Cevap hangi belgede yazılı?
- Veri hangi bölgede işleniyor ve saklanıyor? Ne kadar süre tutuluyor, silme talebi nasıl işliyor?
- Yapay zekaya hangi veri gidiyor, hangisi hiç gitmiyor? Bu sınırı kim, nerede tanımlıyor?
- Sağlayıcı değişirse şirketin kurduğu yapı (belgeler, kurallar, ontoloji) dışarı alınabiliyor mu, yoksa sağlayıcıya mı bağlı kalıyor?
- Açık ağırlıklı bir modele geçmek gerekirse bu mümkün mü?

Yapay zekaya şirkette nereden başlanacağını ve veri sınırlarının nasıl çizileceğini birlikte bulmak için: [Yapay Zeka Danışmanlığı](/tr/services/ai-consulting).

## Kaynaklar

- NVIDIA, "NVIDIA and Palantir Bring Sovereign Intelligence to Critical Supply Chains" (10 Eylül 2026): https://nvidianews.nvidia.com/news/nvidia-and-palantir-bring-sovereign-intelligence-to-critical-supply-chains
- NVIDIA, "Open Models, Closed Environments: Palantir Brings Secure AI to US Agencies With NVIDIA Nemotron" (29 Haziran 2026): https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/
- The Next Web, "Nvidia and Palantir are selling a sovereign AI stack, starting with Nvidia's own supply chain" (10 Eylül 2026): https://thenextweb.com/news/nvidia-palantir-sovereign-ai-supply-chains
