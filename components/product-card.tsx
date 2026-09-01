"use client";

import Link from "next/link";
import { Product } from "@/lib/catalog";
import { useStore } from "@/components/store-provider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore();

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} className="image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.salePrice && <span className="badge">SALE</span>}
      </Link>

      <div className="details">
        <span className="brand">{product.brand}</span>
        <Link href={`/product/${product.slug}`} className="name">
          {product.name}
        </Link>

        <div className="price-row">
          <div className="price">
            {product.salePrice ? (
              <>
                <span className="current">${product.salePrice.toFixed(2)}</span>
                <span className="old">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="current">${product.price.toFixed(2)}</span>
            )}
          </div>
          <button onClick={() => add(product)} className="add-btn">
            + Add
          </button>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #141715;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          background: #1c211e;
          display: block;
        }
        .image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ef4444;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 2px;
        }
        .details {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .brand {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #718096;
        }
        .name {
          font-size: 14px;
          font-weight: 600;
          color: #e2e8f0;
          text-decoration: none;
          margin: 6px 0 12px;
          line-height: 1.4;
        }
        .name:hover {
          color: #10b981;
        }
        .price-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .current {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
        }
        .old {
          font-size: 12px;
          color: #718096;
          text-decoration: line-through;
          margin-left: 6px;
        }
        .add-btn {
          background: #27312c;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .add-btn:hover {
          background: #10b981;
          color: #000000;
        }
      `}</style>
    </div>
  );
}
