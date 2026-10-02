import { FEATURED_IDS, getProducts } from '../data/products';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductGrid } from '../components/product/ProductGrid';
import { Hero } from '../sections/Hero';
import { CategoryDiscovery } from '../sections/CategoryDiscovery';
import { StarterSets } from '../sections/StarterSets';
import { Campaign, NewArrivals } from '../sections/NewAndDeals';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Varyasyon 2 ana sayfa akışı (bilinçli olarak kısa):
 * hero → kategoriler → seçili ürünler → başlangıç setleri → yeni gelenler → kampanya
 */
export function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <CategoryDiscovery />

      <section className="section" aria-labelledby="featured-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            id="featured-title"
            eyebrow="Seçki"
            title="Seçili Ürünler"
            action={{ label: 'Tüm ürünler', to: '/kategori/kaliplar' }}
          />
          <ProductGrid products={getProducts(FEATURED_IDS)} />
        </div>
      </section>

      <StarterSets />
      <NewArrivals />
      <Campaign />
    </>
  );
}
