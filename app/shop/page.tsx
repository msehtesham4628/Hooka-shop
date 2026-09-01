"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";

const cats = ["Tobacco", "Hookahs", "Bowls", "Accessories"];
const brands = ["MustHave", "BlackBurn", "Bonche", "Alpha Hookah", "Moze", "Steamulation", "Element"];

export default function Shop() {
  return <Suspense fallback={<main className="wrap shop"><p className="eyebrow">Loading collection…</p></main>}><ShopContent /></Suspense>;
}

function ShopContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(params.get("category") || "");
  const found = useMemo(() => products.filter((p) => (!selected || p.category.toLowerCase() === selected.toLowerCase()) && (!params.get("brand") || p.brand.toLowerCase() === params.get("brand")!.toLowerCase()) && (!params.get("sale") || p.salePrice) && JSON.stringify(p).toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "low" ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) : sort === "high" ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price) : 0), [query, selected, sort, params]);
  return <main className="wrap shop"><div className="crumb eyebrow">Home / Shop</div><h1>The collection.</h1><div className="shop-layout"><aside><b>Filters</b><label>Search<input className="field" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products"/></label><label>Category</label>{cats.map((c) => <button className={selected === c ? "filter active" : "filter"} onClick={() => setSelected(selected === c ? "" : c)} key={c}>{c}</button>)}<label>Brands</label>{brands.map((b) => <a className="filter" href={`/shop?brand=${b}`} key={b}>{b}</a>)}<label>Availability</label><button className="filter">In stock</button><button className="filter">On sale</button></aside><div><div className="result"><span>{found.length} selected pieces</span><select value={sort} onChange={(e) => setSort(e.target.value)} className="field"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>{found.length ? <div className="grid">{found.map((p) => <ProductCard product={p} key={p.id}/>)}</div> : <div className="empty">No pieces found. Try a different search.</div>}</div></div><style jsx>{`.shop{padding:52px 0 100px}.crumb{margin-bottom:12px}.shop h1{font:600 62px 'Playfair Display';margin:0 0 35px}.shop-layout{display:grid;grid-template-columns:210px 1fr;gap:34px}.shop-layout aside{display:flex;flex-direction:column;gap:8px}.shop-layout aside>b{font-size:20px;margin-bottom:8px}.shop-layout label{font-size:11px;color:#a3ffca;letter-spacing:.08em;margin-top:13px}.shop-layout input{margin-top:8px}.filter{border:0;background:transparent;color:#c4c8c5;text-align:left;padding:4px 0;cursor:pointer;font-size:13px}.filter.active,.filter:hover{color:#a3ffca}.result{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;color:#adb3af;font-size:12px}.result select{width:190px}.empty{padding:50px;border:1px solid #ffffff19;color:#aaa}@media(max-width:700px){.shop{padding-top:30px}.shop h1{font-size:46px}.shop-layout{grid-template-columns:1fr}.shop-layout aside{display:none}}`}</style></main>;
}
