import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { STARTER_SETS } from '../data/products';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Img } from '../components/ui/Img';
import { Price } from '../components/product/ProductBits';
import s from './StarterSets.module.css';

/** Sade bölüm: büyük kampanya bandı değil, 2×2 yatay katalog satırları. */
export function StarterSets() {
  return (
    <section className={`section section--band ${s.band}`} aria-labelledby="sets-title">
      <div className="container">
        <SectionHeader id="sets-title" eyebrow="Başlangıç setleri" title="Başlangıç İçin" action={{ label: 'Tüm setler', to: '/kategori/setler' }} />
        <ul className={s.grid}>
          {STARTER_SETS.map((set) => (
            <li key={set.id} className={s.item}>
              <Link to={`/urun/${set.slug}`} className={s.media} tabIndex={-1} aria-hidden="true">
                <Img image={set.image} alt="" ratio={1} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 40vw" maxWidth={640} className={s.img} />
              </Link>
              <div className={s.body}>
                <p className={s.meta}>
                  {set.level} · {set.yields}
                </p>
                <h3 className={s.name}>
                  <Link to={`/urun/${set.slug}`}>{set.name}</Link>
                </h3>
                <p className={s.info}>{set.shortInfo}</p>
                <div className={s.foot}>
                  <Price price={set.price} oldPrice={set.oldPrice} />
                  <Link to={`/urun/${set.slug}`} className={s.more} aria-label={`${set.name} seti incele`}>
                    İncele
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
