import {useState} from 'react';
import {Link,NavLink} from 'react-router-dom';
import useReveal from '../hooks/useReveal.js';
export const Img=({src,alt,className=''})=>{const [bad,setBad]=useState(false);return bad?<div className={`img-fallback ${className}`} role="img" aria-label={alt}/>:<img className={className} src={src} alt={alt} loading="lazy" onError={()=>setBad(true)}/>;};
export const Reveal=({children,className=''})=>{const [ref,on]=useReveal();return <div ref={ref} className={`reveal ${on?'in':''} ${className}`}>{children}</div>;};
export const State=({loading,error,empty,retry,children})=>loading?<p className="state" role="status">Loading…</p>:error?<p className="state" role="alert">{error}. <button className="link" onClick={retry}>Try again</button></p>:empty?<p className="state">Nothing matches your filters. Clear them to see everything.</p>:children;
export const SectionHead=({title,text})=><div className="head"><h2>{title}</h2>{text&&<p>{text}</p>}</div>;
export const Stars=({n})=><span className="stars" aria-label={`${n.toFixed(1)} out of 5`}>{'★'.repeat(Math.round(n))}{'☆'.repeat(5-Math.round(n))}</span>;
const links=[['Services','/#services'],['Portfolio','/#portfolio'],['Process','/#process'],['About','/#about'],['Contact','/#contact']];
export const Navbar=({solid})=>{const [open,setOpen]=useState(false);return <header className={`nav ${solid?'solid':''}`}><Link to="/" className="logo">LUMIÈRE</Link>
<button className="burger" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button>
<nav className={open?'open':''}>{links.map(([l,h])=><a key={l} href={h} onClick={()=>setOpen(false)}>{l}</a>)}<NavLink to="/journal">Journal</NavLink><a className="btn dark" href="/#contact">Book Consultation</a></nav></header>;};
export const Footer=()=><footer className="foot"><div><h3 className="logo">LUMIÈRE</h3><p>Creating timeless spaces with intention.</p></div>
<nav aria-label="Footer">{['Home:/','About:/#about','Services:/#services','Portfolio:/#portfolio','Process:/#process','Journal:/journal','Contact:/#contact'].map(s=>{const [l,h]=s.split(':');return <a key={l} href={h}>{l}</a>})}</nav>
<nav aria-label="Social"><a href="https://instagram.com">Instagram</a><a href="https://pinterest.com">Pinterest</a><a href="https://linkedin.com">LinkedIn</a></nav><small>© {new Date().getFullYear()} LUMIÈRE Studio. All rights reserved.</small></footer>;
