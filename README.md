# ACG TASARIM — Web Sitesi Varyasyon 2 (Ivory & Blush)

Varyasyon 1'in **mantığı** (rotalar, sepet, favoriler, arama, filtre/sıralama, mock veri) korunarak
görsel katmanı baştan tasarlanmış alternatif: *soft luxury + boutique e-commerce + modern design studio*.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tip kontrolü + üretim çıktısı (dist/)
npm run preview
```

Yönlendirme `HashRouter` ile yapılır; `dist/` herhangi bir statik sunucuya olduğu gibi yüklenebilir.

## Varyasyon 1'den farkı

| | Varyasyon 1 | Varyasyon 2 |
|---|---|---|
| Palet | Soft Premium | **Ivory & Blush** (aktif) |
| Tipografi | Plus Jakarta Sans, semibold başlıklar | **Manrope**, ince (400) editoryal başlıklar, geniş harf aralığı |
| Köşeler | 8–18 px yumuşak, yuvarlak butonlar | 2–6 px keskin köşe, yuvarlak buton yok |
| Header | Mega menü, çizgili | Tek satır, mega menü yok, çizgisiz; aktif öğede ince altın çizgi |
| Hero | Organik blob + 3 görselli kolaj | Büyük tipografi + ofsetli blok üstünde tek kadraj + küçük ikinci görsel |
| Kategoriler | 6 kolon, yuvarlak görsel | 3×2 katalog satırı: numara · ad/açıklama · ok |
| Ürün kartı | 2 butonlu hover, puan, çerçeveli | Çerçevesiz; hover'da alttan kayan tek çubuk, puansız |
| Başlangıç setleri | Pudra bant, içerik listeli kartlar | Beyaz zeminde 2×2 yatay katalog satırları |
| Kampanya | Koyu panel + büyük % | Açık blush panel, tek cümle + [Keşfet] |
| Footer | Koyu, güven şeridi + 6 kolon | Açık/beyaz, 4 kolon + logo/sosyal/ödeme satırı |

**Yılbaşı koleksiyonu:** Hero, solda metin / sağda canlı bir yılbaşı fotoğrafı (pembe-kırmızı hediye düzeni, `xmasHeroGifts`; alternatif: `xmasHeroTree`) + görselin sol yanında ürün sayfasına giden üç küçük kare olarak sezonluk vitrine çevrildi (mobilde sıra: metin → görsel → kırmızı başlıklı "Yılbaşı Özel" şeridi içinde ürün kartları) ve ayrı bir `Yılbaşı` kategorisi eklendi (`#/kategori/yilbasi`, menüde altın noktalı). Ürünler `season: 'yilbasi'` ile işaretlenir; ana sayfadaki "Başlangıç İçin" ve "Yeni Gelenler" bölümlerine karışmaz. Ürün türleri (Noel Baba, çam ağacı, mumluk ev, kardan adam, kurabiye adam) rakip sitelerdeki kış/yılbaşı kalıp kategorilerinden esinlenmiştir; ad, açıklama, ölçü, fiyat ve görseller ACG'ye özgü/örnektir. Sezon bitince hero'yu eski haline almak için `src/sections/Hero.tsx` ve `HERO_IDS` yeterlidir.

Ana sayfa sırası: duyuru → header → hero → kategoriler → seçili ürünler → başlangıç setleri → yeni gelenler → kampanya → footer.

**Bu varyasyonda yok (bilinçli):** akademi/rehber, hesaplayıcılar, "ACG ile üretenler", "bu kalıpla ne yapabilirsin?",
topluluk, Instagram, blog, kullanıcı hikâyeleri. İlgili rota, veri ve arama sonuçları da kaldırıldı.

## Demo ödeme ve demo üyelik

Sepet → **Ödemeye geç** → `#/odeme` → sipariş onayı `#/siparis/ACG-…` akışı demo olarak çalışır:

- Form doğrulaması (iletişim, teslimat, kart) vardır; **gerçek tahsilat yapılmaz**. "Demo test kartını doldur" düğmesi herkese açık test kartını (4242…) yazar.
- Kart numarası/CVC hiçbir yere kaydedilmez; siparişte yalnızca son 4 hane tutulur.
- Kargo: 3.000 TL altı siparişlere sabit 89,90 TL (`STORE.shippingFee`), üstü ücretsiz.
- Üyelik (`#/hesap`): **Üye ol / Giriş yap / Çıkış** ve sipariş geçmişi. Veriler yalnızca tarayıcıda (`localStorage`) tutulur; **şifre saklanmaz ve doğrulanmaz** (en az 6 karakter yeterli).
- Misafir olarak da sipariş verilebilir. Üye olan e-postayla verilen siparişler hesap sayfasında listelenir.
- Kod: `src/context/AccountContext.tsx`, `src/pages/{CheckoutPage,OrderPage,AccountPage}.tsx`, `src/lib/checkout.ts`. Gerçek giriş ve ödeme sağlayıcısı bu katmanın yerine geçecek.

## Katalog kapsamı

Sabun ve epoksi ürünleri/kategorileri siteden çıkarıldı. Kalan üretim alanları: **Mum, Kokulu Taş, Boyama, Dekorasyon** (+ Yılbaşı koleksiyonu). Başlangıç setleri: Mum, Kokulu Taş, Dekorasyon, Boyama (ve Yılbaşı Mum Seti).

## Renk paletleri (tema)

`src/styles/tokens.css` içinde üç palet tutulur; **aktif: Palet 2 · Ivory & Blush**.
Değiştirmek için `index.html` içindeki `<html data-theme="ivory-blush">` değerini
`soft-premium` veya `acg-modern` yapmak yeterlidir. Bileşenler yalnızca semantik tokenları kullanır.

| Token | Ivory & Blush |
|---|---|
| Zemin | Ivory `#F7F3EE` (+ White `#FFFFFF` kart/yüzey) |
| Marka / CTA vurgusu | Dusty Blush `#DFA7A0` |
| İkincil metin | Rose Taupe `#A88984` |
| Başlık / ana metin / birincil buton | Deep Taupe `#514943` |
| Premium detay | Champagne Gold `#C7A86B` — yalnızca ince çizgi, ayırıcı nokta, küçük etiket kenarı |

Rose Taupe küçük metinde WCAG AA kontrastını karşılamadığından ikincil *metin* için Deep Taupe'a doğru bir ton
koyulaştırılmış hali kullanılır (`--color-text-secondary`); Rose Taupe'un kendisi büyük vurgu ve süslemelerde kalır.
Nav/bağlantı hover'ında Dusty Blush'un bir ton koyusu (`--color-brand-ink`) kullanılır.

## Logo

Logo yeniden çizilmedi; oran ve renkler korunmuştur. Header için `public/brand/acg-logo-lockup-*` türevlerindeki
beyaza yakın gömülü zemin, ivory yüzeyde kutu gibi görünmesin diye *color-to-alpha* ile saydamlaştırıldı (renkler değişmedi).

## Yayın öncesi değiştirilecek placeholder'lar

- **Görseller:** `src/data/images.ts` — Unsplash stok fotoğrafları (önizleme). ACG'nin kendi çekimleri (beyaz/ivory zemin, doğal ışık, 4:5) gelince yalnızca bu dosya güncellenir.
- **Mağaza bilgileri:** `src/data/content.ts` → `STORE` (kargo eşiği, iletişim, sosyal medya).
- **Ürün verisi:** `src/data/products.ts` — fiyat, stok, puan örnektir.
- **Ödeme logoları** (footer) ve **yorumlar** (örnek alan).

Gerçek ödeme sağlayıcısı, gerçek üyelik/giriş, kargo entegrasyonu ve gerçek stok bu önizlemenin kapsamı dışındadır (ödeme ve üyelik şu an demo).
