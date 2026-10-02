import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { STORE } from '../../data/content';
import { MAIN_NAV } from '../../data/taxonomy';
import { useShop } from '../../context/ShopContext';
import { useAccount } from '../../context/AccountContext';
import { useHeaderVisibility } from '../../hooks/useUi';
import { cx } from '../../lib/format';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import s from './Header.module.css';

export function AnnouncementBar() {
  return (
    <div className={s.announce}>
      <ul className="container">
        {STORE.announcement.map((item, i) => (
          <li key={item} className={i > 0 ? s.announceExtra : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Minimal tek satır header: logo · menü · araçlar. Alt menü / mega panel yok. */
export function Header() {
  const { cartCount, favorites, setSearchOpen, setCartOpen } = useShop();
  const { user } = useAccount();
  const { hidden, scrolled } = useHeaderVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  const headerHidden = hidden && !menuOpen;
  // Yapışkan alt çubuklar (ör. mobil filtre) header'ın açık/gizli durumuna göre konumlansın
  useEffect(() => {
    document.documentElement.toggleAttribute('data-header-hidden', headerHidden);
  }, [headerHidden]);

  return (
    <>
      <header className={cx(s.header, scrolled && s.scrolled, headerHidden && s.hidden)}>
        <div className={cx('container', s.inner)}>
          <Logo />

          <nav className={s.nav} aria-label="Ana menü">
            <ul>
              {MAIN_NAV.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} className={({ isActive }) => cx(s.navLink, isActive && s.navActive, item.accent && s.navAccent)}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.tools}>
            <button type="button" className={s.tool} onClick={() => setSearchOpen(true)} aria-label="Ara">
              <Search strokeWidth={1.4} />
            </button>
            <Link to="/hesap" className={cx(s.tool, s.desktopOnly)} aria-label={user ? `Hesabım (${user.name})` : 'Giriş yap / Üye ol'}>
              <User strokeWidth={1.4} />
              {user && <span className={s.signedIn} aria-hidden="true" />}
            </Link>
            <Link to="/favoriler" className={s.tool} aria-label={`Favoriler (${favorites.length})`}>
              <Heart strokeWidth={1.4} />
              {favorites.length > 0 && <span className={s.count}>{favorites.length}</span>}
            </Link>
            <button type="button" className={s.tool} onClick={() => setCartOpen(true)} aria-label={`Sepet (${cartCount} ürün)`}>
              <ShoppingBag strokeWidth={1.4} />
              {cartCount > 0 && (
                <span key={cartCount} className={cx(s.count, s.countBump)}>
                  {cartCount}
                </span>
              )}
            </button>
            <button type="button" className={cx(s.tool, s.mobileOnly)} onClick={() => setMenuOpen(true)} aria-label="Menüyü aç" aria-expanded={menuOpen}>
              <Menu strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
