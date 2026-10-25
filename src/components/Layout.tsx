import { trapDialogFocus } from '../hooks/dialogFocus';
import { useReducedEffects, MotionControl } from './MotionPreference';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react';
import { navigation } from '../data/menu';
import { Eyebrow, Flame, Magnetic } from './UI';

export function Header() {
  const [open,setOpen]=useState(false);
  const dialog=useRef<HTMLDialogElement>(null);
  const location=useLocation();const reduced=useReducedEffects();
  useEffect(()=>setOpen(false),[location.pathname]);
  useEffect(()=>{
    const d=dialog.current;
    if(open){d?.showModal();document.body.style.overflow='hidden';}
    else {d?.close();document.body.style.overflow='';}
    return ()=>{document.body.style.overflow='';};
  },[open]);
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header ${location.pathname.startsWith('/dish')?'header-light':''}`}>
      <Link to="/" className="brand" aria-label="EMBER home">EMBER<span className="brand-star">✳</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLink to="/menu">The menu</NavLink><NavLink to="/experience">The experience</NavLink><NavLink to="/about">Our story</NavLink>
      </nav>
      <div className="header-actions"><Magnetic><Link to="/reservations" className="header-book">Reserve a table <ArrowUpRight size={15}/></Link></Magnetic><button className="menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}><MenuIcon strokeWidth={1.2} size={25}/></button></div>
    </header>
    <dialog ref={dialog} className="navigation-dialog" onKeyDown={trapDialogFocus} onCancel={()=>setOpen(false)} aria-label="Explore EMBER" data-lenis-prevent>
      {open && <motion.div className="navigation-inner" initial={reduced?false:{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} transition={{duration:reduced?0:.65,ease:[.22,1,.36,1]}}>
        <div className="navigation-top"><Link to="/" className="brand" onClick={()=>setOpen(false)}>EMBER</Link><button className="menu-toggle" onClick={()=>setOpen(false)} aria-label="Close navigation"><X strokeWidth={1.1} size={28}/></button></div>
        <div className="navigation-grid"><div className="navigation-image"><img src="/images/room.jpg" alt="Warm candlelight in the EMBER dining room"/><Eyebrow>A place to lose track of time.</Eyebrow></div>
        <nav aria-label="All pages">{navigation.map((n,i)=><motion.div key={n.to} initial={reduced?false:{y:40,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:reduced?0:.15+i*.06,duration:reduced?0:.55}}><Link to={n.to} onClick={()=>setOpen(false)}><sup>0{i+1}</sup>{n.label}<ArrowUpRight strokeWidth={.8}/></Link></motion.div>)}</nav></div>
        <div className="navigation-bottom"><span>RĪGA, LATVIA · 56°56′ N 24°06′ E</span><span>FIRE. SEASON. INSTINCT.</span></div>
      </motion.div>}
    </dialog>
  </>
}

export function Footer(){return <footer className="site-footer">
  <div className="footer-top"><div><Flame className="footer-flame"/><p>Good things<br/>take a little fire.</p></div><div><Eyebrow>Find your evening</Eyebrow><Link to="/reservations">Reserve a table <ArrowUpRight size={15}/></Link><Link to="/experience">Step inside <ArrowUpRight size={15}/></Link></div><div><Eyebrow>At the table</Eyebrow><p>Wednesday — Sunday<br/>18:00 — 23:00</p><p className="muted">Rīga, Latvia</p></div></div>
  <Link to="/" className="footer-wordmark" aria-label="Return to EMBER home">EMBER<span>®</span></Link>
  <div className="footer-bottom"><span>© {new Date().getFullYear()} EMBER</span><span>AN INDEPENDENT RESTAURANT CONCEPT</span><span>FICTIONAL PLACE. REAL CRAFT.</span><MotionControl/></div>
</footer>}

export function Preloader(){
  const reduced=useReducedEffects();
  const [show,setShow]=useState(()=>{try{return !sessionStorage.getItem('ember-entered');}catch{return true;}});
  const [loaded,setLoaded]=useState(0);
  useEffect(()=>{
    if(!show)return;
    let active=true;
    const finish=()=>{if(active){setShow(false);try{sessionStorage.setItem('ember-entered','1');}catch{/* storage is optional */}}};
    if(reduced){finish();return;}
    const img=new Image();const photo=new Promise<void>(resolve=>{img.onload=()=>resolve();img.onerror=()=>resolve();img.src='/images/hero.jpg';});
    let count=0;
    [photo,document.fonts.ready].forEach(p=>p.then(()=>{if(active)setLoaded(++count*50);}));
    Promise.all([photo,document.fonts.ready,new Promise(r=>setTimeout(r,900))]).then(finish);
    const fallback=setTimeout(finish,3200);
    return()=>{active=false;clearTimeout(fallback);};
  },[show,reduced]);
  return <AnimatePresence onExitComplete={()=>window.dispatchEvent(new Event('ember-ready'))}>{show&&<motion.div className="preloader" role="status" aria-label="Preparing the EMBER experience" exit={{clipPath:'inset(0 0 100% 0)'}} transition={{duration:.85,ease:[.76,0,.24,1]}}><Eyebrow>EVERYTHING BEGINS WITH A SPARK</Eyebrow><Flame/><span className="preloader-wordmark">EMBER</span><div className="preloader-track"><motion.span animate={{scaleX:loaded/100}}/></div><div className="preloader-bottom"><span>LIGHTING THE FIRE — {loaded}%</span><button onClick={()=>{setShow(false);try{sessionStorage.setItem('ember-entered','1');}catch{/* optional */}}}>Enter now <ArrowUpRight size={14}/></button></div></motion.div>}</AnimatePresence>
}
