"use client";

import { useState } from "react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = ["All", "Hookahs", "Tobacco", "Bowls", "Accessories", "Charcoal"];

  const filtered = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sortBy === "price-desc") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      return 0;
    });

  return (
    <div className="catalog-layout">
      <aside className="filters">
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="product-feed">
        <div className="feed-header">
          <p>Showing {filtered.length} products</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .catalog-layout {
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }
        .filters h3 {
          font-size: 16px;
          margin-bottom: 16px;
          color: #ffffff;
        }
        .filters ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .filters button {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 14px;
          padding: 8px 0;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: color 0.2s;
        }
        .filters button.active,
        .filters button:hover {
          color: #10b981;
          font-weight: 600;
        }
        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          color: #94a3b8;
          font-size: 14px;
        }
        select {
          background: #181b19;
          color: #ffffff;
          border: 1px solid #2e3632;
          padding: 6px 12px;
          border-radius: 4px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        @media (max-width: 768px) {
          .catalog-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
