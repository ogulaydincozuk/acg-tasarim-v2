import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake } from 'lucide-react';
import { XMAS_PRODUCTS, getProducts } from '../data/products';
import { Img } from '../components/ui/Img';
import { formatPrice } from '../lib/format';
import s from './Hero.module.css';

/** Görselin yanındaki üç küçük kare: yılbaşı ürünleri (çam ağacı · Noel Baba · mumluk ev) */
const TILE_IDS = ['p-201', 'p-202', 'p-203'];

/** Ocak ayında içinde bulunulan yıla, diğer aylarda yaklaşan yeni yıla göre hesaplanır. */
function newYearInfo(now = new Date()) {
  const inJanuary = now.getMonth() === 0;
  const year = inJanuary ? now.getFullYear() : now.getFullYear() + 1;
  const days = Math.ceil((new Date(year, 0, 1).getTime() - now.getTime()) / 86_400_000);
  return { year, days: inJanuary ? 0 : days };
}

/**
 * Sezonluk hero: solda metin, sağda canlı yılbaşı fotoğrafı. Fotoğrafın sol yanındaki üç küçük kare
 * yılbaşı ürünlerine doğrudan gider.
 */
export function Hero() {
  const tiles = getProducts(TILE_IDS);
  const { year, days } = newYearInfo();
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <span className="eyebrow">Yılbaşı Koleksiyonu · {year}</span>
          <h1 id="hero-title" className={s.title}>
            Yılbaşını
            <br />
            kendi ellerinle
            <br />
            <span className={s.muted}>ışıl ışıl yap.</span>
          </h1>
          <p className={s.lead}>
            Noel Baba, çam ağacı, kardan adam ve mumluk ev kalıpları; esanslar ve hediye setleri tek koleksiyonda.
          </p>
          <div className={s.ctas}>
            <Link to="/kategori/yilbasi" className="btn btn--primary">
              Yılbaşı Koleksiyonu
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/kategori/kaliplar" className="btn btn--secondary">
              Tüm Ürünler
            </Link>
          </div>
          <p className={s.meta}>
            <span className={s.metaDot} aria-hidden="true" />
            <span>
              {days > 0 ? (
                <>
                  Yeni yıla <strong>{days} gün</strong> kaldı
                </>
              ) : (
                'Mutlu yıllar'
              )}
            </span>
            <span className={s.sep} aria-hidden="true" />
            <span>{XMAS_PRODUCTS.length} yeni sezon ürünü</span>
          </p>
        </div>

        <div className={s.visual}>
          <span className={s.block} aria-hidden="true" />
          <Link to="/kategori/yilbasi" className={s.main} aria-label="Yılbaşı koleksiyonunu incele">
            <Img
              image="xmasHeroGifts"
              alt="Hediye paketleri, tarçın çubukları ve şekerlemelerle hazırlanmış yılbaşı masası"
              ratio={5 / 6}
              sizes="(min-width: 1024px) 34vw, 100vw"
              priority
              maxWidth={1080}
              className={s.mainImg}
            />
          </Link>
          <Link to="/kategori/yilbasi" className={`btn btn--light ${s.photoCta}`}>
            Yılbaşı Koleksiyonu
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className={s.special}>
          <div className={s.specialHead}>
            <span className={s.specialEyebrow}>
              <Snowflake aria-hidden="true" strokeWidth={1.6} />
              Yılbaşı Özel
            </span>
            <h2 className={s.specialTitle}>Yılbaşına özel seçimler</h2>
          </div>
          <ul className={s.tiles} aria-label="Yılbaşı ürünleri">
            {tiles.map((p) => (
              <li key={p.id}>
                <Link to={`/urun/${p.slug}`} className={s.tile}>
                  <Img image={p.image} alt="" ratio={1} sizes="130px" maxWidth={480} className={s.tileImg} />
                  <span className={s.tileText}>
                    <span className={s.tileName}>{p.name}</span>
                    <span className={s.tilePrice}>{formatPrice(p.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/kategori/yilbasi" className={`text-link ${s.specialLink}`}>
            Tüm yılbaşı ürünleri
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
