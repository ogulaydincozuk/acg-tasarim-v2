import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NEW_ARRIVALS } from '../data/products';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductGrid } from '../components/product/ProductGrid';
import { Img } from '../components/ui/Img';
import s from './NewAndDeals.module.css';

/** Minimal ürün grid'i — 4 ürün. */
export function NewArrivals() {
  return (
    <section className="section" aria-labelledby="new-title">
      <div className="container">
        <SectionHeader id="new-title" eyebrow="Koleksiyona eklendi" title="Yeni Gelenler" action={{ label: 'Tümünü gör', to: '/kategori/yeni-gelenler' }} />
        <ProductGrid products={NEW_ARRIVALS.slice(0, 4)} />
      </div>
    </section>
  );
}

/**
 * Sade kampanya alanı: bağıran kırmızı/sarı etiket, büyük "SALE" ya da yüzdeler yok;
 * ivory yüzeyde tek cümle, tek bağlantı ve sakin bir görsel.
 */
export function Campaign() {
  return (
    <section className="section" aria-labelledby="campaign-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className={s.panel}>
          <div className={s.copy}>
            <span className="eyebrow">Kampanyalar</span>
            <h2 id="campaign-title" className={s.title}>
              Seçili ürünlerde
              <br />
              özel fiyatlar
            </h2>
            <p className={s.text}>Sezonun sevilen kalıp, hammadde ve setlerinde dönemsel fiyat avantajı.</p>
            <Link to="/kategori/kampanyalar" className="btn btn--primary">
              Keşfet
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className={s.media}>
            <Img image="vaseCollection" alt="Doğal tonlarda seramik vazolar" ratio={4 / 3} sizes="(min-width: 1024px) 50vw, 100vw" maxWidth={1400} className={s.img} />
          </div>
        </div>
      </div>
    </section>
  );
}
