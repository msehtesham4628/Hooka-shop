"use client";

import Link from "next/link";
import { useStore } from "./store-provider";

export function CartDrawer() {
  const { cart, change, openCart, setOpenCart } = useStore();
  const total = cart.reduce((sum, line) => sum + (line.product.salePrice ?? line.product.price) * line.quantity, 0);

  return (
    <aside className={openCart ? "drawer open" : "drawer"} aria-label="Shopping bag">
      <button className="close" onClick={() => setOpenCart(false)} aria-label="Close shopping bag">×</button>
      <span className="eyebrow">Your selection</span>
      <h2>Shopping bag</h2>
      {!cart.length ? (
        <p className="empty">Your bag is waiting for something exceptional.</p>
      ) : (
        <>
          <div className="lines">
            {cart.map(({ product, quantity }) => (
              <div className="line" key={product.id}>
                <img src={product.image} alt="" />
                <div>
                  <b>{product.name}</b>
                  <small>{product.brand}</small>
                  <span>${(product.salePrice ?? product.price).toFixed(2)}</span>
                </div>
                <div className="quantity" aria-label={`Quantity for ${product.name}`}>
                  <button onClick={() => change(product.id, quantity - 1)} aria-label={`Remove one ${product.name}`}>−</button>
                  {quantity}
                  <button onClick={() => change(product.id, quantity + 1)} aria-label={`Add one ${product.name}`}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="total"><span>Subtotal</span><b>${total.toFixed(2)}</b></div>
          <Link onClick={() => setOpenCart(false)} className="button" href="/checkout">Secure checkout</Link>
        </>
      )}
    </aside>
  );
}
