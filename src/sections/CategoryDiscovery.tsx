import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CRAFT_CATEGORIES } from '../data/taxonomy';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Img } from '../components/ui/Img';
import s from './CategoryDiscovery.module.css';

export function CategoryDiscovery() {
  return (
    <section className="section" aria-labelledby="craft-title" style={{ paddingTop: 0 }}>
      <div className="container">
        <SectionHeader id="craft-title" eyebrow="Koleksiyon" title="Kategorileri Keşfet" />
        <ul className={s.grid}>
          {CRAFT_CATEGORIES.map((c, i) => (
            <li key={c.usage}>
              <Link to={`/kategori/${c.usage}`} className={s.card}>
                <Img
                  image={c.image}
                  alt=""
                  ratio={5 / 4}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                  className={s.img}
                  priority={i < 3}
                  maxWidth={1080}
                />
                <span className={s.label}>
                  <span className={s.index} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={s.text}>
                    <span className={s.name}>{c.name}</span>
                    <span className={s.hint}>{c.hint}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className={s.icon} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
