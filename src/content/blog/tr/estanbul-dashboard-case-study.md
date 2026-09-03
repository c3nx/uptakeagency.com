---
title: "Tek Mekan, Tek Ekran: Bir Oyun Merkezi İçin Özel Operasyon Panosu"
description: "Tek mekanlı bir oyun eğlence işletmesi, dağınık tabloları personel, gelir ve kâr zarar verisini tek ekranda gösteren gerçek zamanlı bir panoyla değiştirdi."
date: 2026-09-02
tags: ["Case Study", "Custom Software", "Operations", "Dashboards"]
locale: "tr"
author: "Cengiz Selçuk"
---

Bir oyun merkezinde kapanış saati, ikinci bir mesai gibi geçer. Biri kasayı sayar. Biri istasyon saatlerini bir tabloya işler. Vardiya amiri kimin geç geldiğini, kimin kimin yerine baktığını not eder. Yiyecek içecek satışları satış noktası sisteminde durur, personel saatleri ayrı bir dosyada tutulur, bakım kayıtları ise kasanın arkasındaki bir deftere yazılır. Bu işlerin her biri kendi başına küçük ve sıradan; zor olan, hepsinin farklı yerlerde, farklı formatlarda, birbirinden habersiz durması.

Tek mekanlı bir işletme için bunların hiçbiri sıra dışı değil. Asıl maliyetli olan, çok basit bir soruya cevap vermenin ne kadar uzun sürmesi: bugün gerçekten kâr etti mi? Çoğu tek mekanlı işletmede bu cevap günler, hatta haftalar sonra, elle derlenerek gelir; o noktada artık bir karar değil, geçmişte kalmış bir bilgidir.

Estanbul tek bir mekan işletiyor. Bu, bir zincirin pilot şubesi değil, işin tamamı. Buna rağmen kendilerine tam kapsamlı bir operasyon ve analitik platformu kurduk: [Estanbul Dashboard](/tr/work/estanbul-dashboard). Nedeni basit: tek bir mekanın yönetim yükü, şube sayısından bağımsız olarak, ortadan kaldırılmaya değecek kadar büyük.

## Aslında ne inşa ettik

Platform; mekan yönetimini, personel takibini ve iş analitiğini tek bir gerçek zamanlı arayüzde birleştiriyor. Farklı ekranlarda dağınık duran veriler, aynı arayüzde bir araya geliyor. En kolay anlatım yolu üç parçaya ayırmak: personel, para, operasyon.

### Personel

Personel modülü sadece bir isim listesi değil, mekan operasyonları için eksiksiz bir insan kaynakları katmanı:

- Gerçek çalışma saatlerinin kayda geçmesi için biyometrik devamlılık entegrasyonuyla desteklenen giriş çıkış takibi
- Fazla mesai kurallarıyla otomatik maaş saati hesaplamaları
- Vardiya şablonları ve rotasyon desenleriyle vardiya programlama, buna ek olarak değişim talepleri ve çakışma tespiti
- Onay iş akışlarıyla izin yönetimi
- Performans değerlendirmeleri ve olay kaydı, bireysel ve takım performans görünümleriyle birlikte

Biyometrik devamlılığın burada sağladığı şey gözetim değil. Sağladığı şey, maaş saatlerinin birinin salı gününü nasıl hatırladığına değil, sisteme düşen bir kayda dayanmasıdır.

### Finans

Finansal taraf, yönetimin her sabah ilk baktığı yer:

- Günlük gelir dökümleri
- Gider takibi
- İstasyon başına kârlılık analizi, böylece mekan hangi bölümlerin kendi maliyetini karşıladığını görebiliyor

İstasyon bazında kârlılık, genel bir satış raporunun nadiren verdiği bir sayı. Satış noktası sistemi size neyin satıldığını söyleyebilir. Ama o istasyonun kapladığı alanı, kullandığı donanımı ve tükettiği elektriği hak edip etmediğini genelde söyleyemez.

### Operasyon

Operasyon katmanı mekanın kendisini kapsıyor:

- Canlı mekan doluluğu ve müşteri trafik desenleri
- Gerçek zamanlı istasyon başına gelir
- Oyun donanımı envanteri
- Bakım takvimleri ve değişim takibi

Bir oyun mekanındaki donanım, en kötü anda bozulan, zamanla değer kaybeden bir varlıktır. Bakımı ve değişimi, istasyon başına geliri izleyen aynı sistemde takip etmek, bir değişim kararının içgüdüyle değil rakamla savunulabilmesi demek.

Platform ayrıca, tek tek mekanların detayına inilebilen, merkezileşmiş bir çoklu mekan görünümünü de destekliyor. Estanbul bugün tek mekanlı bir işletme olarak buna ihtiyaç duymuyor. Bu özellik, yarın ikinci bir şube açılırsa, o şube için ikinci bir sisteme gerek kalmasın diye orada duruyor.

## Günlük yönetimde ne değişti

Sonucun dürüst özeti bir yüzde değil. Yönetim çok daha kolaylaştı. Mekanın kendi ifadesiyle en büyük kazanım, günlük geliri ve kâr zarar tablosunu tek ekranda görebilmekti.

Bu, neyin yerini aldığını sayana kadar mütevazı görünüyor. Panodan önce bu tablo, birden fazla bağlantısız tablo dosyasından ve manuel süreçten elle derleniyordu; kimsenin sık sık tekrarlamak istemediği bir aritmetikti. Platform bunların hepsinin yerine tek bir bakılacak yer koydu.

Bundan iki şey çıkıyor. Birincisi idari: rapor derlemeye giden saatler artık rapor derlemeye gitmiyor. İkincisi daha önemli. Sayılar yeniden inşa edilmiş değil de güncel olduğunda, kararlar artık sonradan gelen bir raporu beklemiyor. Bir fazla mesai deseni personel sorunu mu yoksa talep deseni mi, mekanın yavaş bir bölümü her gün mü yoksa sadece hafta içi mi yavaş, bir bakım maliyeti belirli bir makine grubunda mı tekrarlıyor: bunların hepsi, veri hala işe yararken elinize ulaştığında sorabileceğiniz sorular.

Aynı müşteri için [Estanbul AI Agent](/tr/work/estanbul-ai-agent)'ı da geliştirdik; WhatsApp, web sohbet ve sosyal medyayı kapsayan çok kanallı bir müşteri hizmetleri ajanı. Yapay zeka olduğu için o proje daha çok ilgi çekiyor, konuşmalarda daha sık gündeme geliyor. Ama işletmenin günlük yönetim şeklini asıl değiştiren parça bu pano.

## Hazır paket mi, özel geliştirme mi

Çoğu vaka çalışmasının atladığı kısım burası, o yüzden lafı dolandırmadan düz cevabı verelim.

İşletmenizin yaygın, bilinen bir yapısı varsa hazır bir sistem genelde doğru seçimdir; o durumda özel bir geliştirmeye gerek yoktur. Makinede geçirilen zaman değil ürün satıyorsanız, standart bir satış noktası paketiyle bir bordro sağlayıcısının birlikte kullanımı ihtiyacınızın çoğunu karşılar. Personel sayınız küçük ve sabitse, genel amaçlı bir araç içinde programlama yeterlidir. Tedarikçinin zaten sunduğu raporlar sorularınızı cevaplıyorsa, tedarikçinin ürününü satın alın. Var olan bir aboneliği yeniden üreten özel yazılım, paranın israfıdır.

Özel bir geliştirme, birkaç koşul üst üste bindiğinde mantıklı hale gelir:

- **Kâr biriminiz sıra dışı.** Bir oyun mekanı istasyon saati başına kazanır. Çoğu perakende ve restoran raporlaması ürün kodu etrafında kurulur ve bunu ifade edemez.
- **İhtiyacınız olan cevap birden fazla sistemi kapsıyor.** Personel saatlerine, istasyon gelirine ve donanım maliyetine aynı anda bağlı bir kâr zarar tablosu, bu üçünden sadece birine sahip bir araçta asla ortaya çıkmaz.
- **Entegrasyonu zaten elle, para karşılığında yapıyorsunuz.** Sistemler arası manuel dışa aktarma ve kopyala yapıştır, gerçek ama görünmez bir tekrarlayan maliyettir ve işletme büyüdükçe kötüleşir.
- **Belirli bir donanım veya süreç entegrasyonuna ihtiyacınız var.** Biyometrik devamlılık, istasyon bazlı gelir takibi ve mekana özgü vardiya kuralları, genel ürünlerin tam olarak istisna kabul ettiği şeylerdir.

Ödünleşimler gerçek. Özel bir platform sahip olduğunuz, dolayısıyla bakımını da üstlendiğiniz bir şeydir. İlk günden hazır bir aboneliğe göre daha pahalıdır. Değmesi için net bir entegrasyon yüzeyine, sonrasında da onu çalışır tutacak birine ihtiyaç duyar. Bunun karşılığını, alternatifin kalıcı manuel iş ve bayat rakamlarla verilen kararlar olduğu durumlarda görürsünüz; yoğun tek bir mekanın genelde içinde bulunduğu durum tam olarak budur.

## Tek mekan çıkarımı

Bunu haklı çıkarmak için zincir olmanıza gerek yok. Merkezileştirmenin sebebi, karşılaştıracak çok sayıda şubeniz olması değil. Sebep, tek bir mekanın bile personel verisini, gelir verisini, gider verisini ve varlık verisini ayrı ayrı yerlerde üretmesi; bunları elle bir araya getirmenin ise kimseye iş tanımı olarak verilmemiş bir yük olması.

İşletmeniz bu şekildeyse, sorulması gereken soru dar: hangi kararı, rakam geç geldiği için geç veriyorsunuz? Bunu dürüstçe cevaplayın, hazır bir raporlamanın yeterli mi yoksa özel bir geliştirmenin mi gerekli olduğunu bileceksiniz.

Cevap bir geliştirmeyse, [özel yazılım geliştirme](/tr/services/custom-software) çalışmamız tam olarak bunun için var. [Bize ulaşın](/tr/contact) ve işletmenizi anlatın, size özel bir platformun doğru cevap olup olmadığını açıkça söyleyelim.
