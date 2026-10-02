import { Link } from 'react-router-dom';
import { Heart, Package, Search, User } from 'lucide-react';
import { STORE } from '../../data/content';
import { MAIN_NAV } from '../../data/taxonomy';
import { useShop } from '../../context/ShopContext';
import { useAccount } from '../../context/AccountContext';
import { Drawer } from '../ui/Drawer';
import s from './MobileMenu.module.css';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setSearchOpen, favorites } = useShop();
  const { user } = useAccount();

  return (
    <Drawer open={open} onClose={onClose} title="Menü" side="right" width={420}>
      <div className={s.wrap}>
        <button
          type="button"
          className={s.search}
          onClick={() => {
            onClose();
            setSearchOpen(true);
          }}
        >
          <Search strokeWidth={1.4} aria-hidden="true" />
          Kalıp, hammadde veya set ara
        </button>

        <nav aria-label="Mobil ana menü">
          <ul className={s.list}>
            {MAIN_NAV.map((item, i) => (
              <li key={item.label}>
                <Link to={item.to} className={s.row} onClick={onClose}>
                  <span className={s.index} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={s.account}>
          <li>
            <Link to="/hesap" onClick={onClose}>
              <User strokeWidth={1.4} aria-hidden="true" /> {user ? `Hesabım · ${user.name.split(' ')[0]}` : 'Giriş yap / Üye ol'}
            </Link>
          </li>
          <li>
            <Link to="/favoriler" onClick={onClose}>
              <Heart strokeWidth={1.4} aria-hidden="true" /> Favorilerim {favorites.length > 0 && <span className={s.badge}>{favorites.length}</span>}
            </Link>
          </li>
          <li>
            <Link to="/sayfa/siparis-takibi" onClick={onClose}>
              <Package strokeWidth={1.4} aria-hidden="true" /> Siparişlerim
            </Link>
          </li>
        </ul>

        <p className={s.contact}>
          {STORE.hours}
          <br />
          {STORE.email}
        </p>
      </div>
    </Drawer>
  );
}
