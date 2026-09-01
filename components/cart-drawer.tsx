"use client";

import Link from "next/link";
import { useStore } from "./store-provider";

export interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  salePrice?: number | null;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export function CartDrawer() {
  const { cart, change, openCart, setOpenCart } = useStore();

  const total = (cart as CartItem[]).reduce(
    (sum, line) =>
      sum + (line.product.salePrice ?? line.product.price) * line.quantity,
    0
  );

  return (
    <aside
      className={`drawer ${openCart ? "open" : ""}`}
      aria-label="Shopping bag"
      aria-hidden={!openCart}
    >
      <button
        type="button"
        className="close"
        onClick={() => setOpenCart(false)}
        aria-label="Close shopping bag"
      >
        ×
      </button>

      <span className="eyebrow">Your selection</span>
      <h2>Shopping bag</h2>

      {!cart?.length ? (
        <p className="empty">Your bag is waiting for something exceptional.</p>
      ) : (
        <>
          <div className="lines">
            {cart.map(({ product, quantity }) => (
              <div className="line" key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <div className="details">
                  <b>{product.name}</b>
                  <small>{product.brand}</small>
                  <span>
                    ${(product.salePrice ?? product.price).toFixed(2)}
                  </span>
                </div>
                <div
                  className="quantity"
                  aria-label={`Quantity for ${product.name}`}
                >
                  <button
                    type="button"
                    onClick={() => change(product.id, quantity - 1)}
                    aria-label={`Remove one ${product.name}`}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => change(product.id, quantity + 1)}
                    aria-label={`Add one ${product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Subtotal</span>
            <b>${total.toFixed(2)}</b>
          </div>

          <Link
            href="/checkout"
            className="button"
            onClick={() => setOpenCart(false)}
          >
            Secure checkout
          </Link>
        </>
      )}

      <style jsx>{`
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1000;
        }

        .drawer.open {
          transform: translateX(0);
        }

        .close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          font-size: 1.75rem;
          cursor: pointer;
          line-height: 1;
        }

        .eyebrow {
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: #71717a;
          margin-bottom: 0.25rem;
        }

        h2 {
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
        }

        .empty {
          color: #71717a;
          margin: auto 0;
          text-align: center;
        }

        .lines {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-right: 0.5rem;
        }

        .line {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f4f4f5;
        }

        .line img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 6px;
        }

        .details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .details small {
          color: #71717a;
        }

        .quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #e4e4e7;
          border-radius: 4px;
          padding: 0.2rem;
        }

        .quantity button {
          background: none;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 24px;
        }

        .total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e4e4e7;
          margin-top: 1rem;
        }

        .button {
          display: block;
          text-align: center;
          background: #000000;
          color: #ffffff;
          padding: 0.9rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 1rem;
        }
      `}</style>
    </aside>
  );
}
