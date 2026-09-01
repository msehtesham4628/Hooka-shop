"use client";

import Link from "next/link";
import { useStore } from "@/components/store-provider";

export function Navbar() {
  const { cart, setOpenCart } = useStore();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="nav-header">
      <div className="top-banner">
        <span>Worldwide Shipping &bull; Official Distributor &bull; 21+ Age Verification Required</span>
      </div>

      <nav className="nav-main">
        <div className="nav-container">
          <Link href="/" className="logo">
            HOOKAH MARKET<span>.</span>
          </Link>

          <ul className="nav-links">
            <li><Link href="/shop?category=Hookahs">Hookahs</Link></li>
            <li><Link href="/shop?category=Tobacco">Tobacco</Link></li>
            <li><Link href="/shop?category=Bowls">Bowls</Link></li>
            <li><Link href="/shop?category=Accessories">Accessories</Link></li>
            <li><Link href="/shop?category=Charcoal">Charcoal</Link></li>
          </ul>

          <div className="nav-actions">
            <Link href="/search" className="action-btn" aria-label="Search">🔍</Link>
            <button
              onClick={() => setOpenCart(true)}
              className="cart-btn"
              aria-label="View shopping bag"
            >
              Bag <span className="cart-badge">{itemCount}</span>
            </button>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .nav-header {
          position: sticky;
          top: 0;
          z-index: 900;
          background: #0f1110;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .top-banner {
          background: #141816;
          color: #8c9792;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          padding: 6px 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-decoration: none;
        }
        .logo span {
          color: #10b981;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 28px;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .nav-links a:hover {
          color: #ffffff;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .action-btn {
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          font-size: 16px;
        }
        .cart-btn {
          background: #10b981;
          color: #000000;
          border: none;
          border-radius: 4px;
          padding: 8px 14px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .cart-badge {
          background: #000000;
          color: #ffffff;
          border-radius: 999px;
          padding: 1px 6px;
          font-size: 11px;
        }
      `}</style>
    </header>
  );
}
