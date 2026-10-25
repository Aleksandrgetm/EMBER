import { useReducedEffects } from './components/MotionPreference';
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header, Footer, Preloader } from './components/Layout';
import { InlineArrow } from './components/UI';
import { useSmoothScroll } from './hooks/useMotion';
import Home from './pages/Home';
const Menu=lazy(()=>import('./pages/Menu'));
const DishDetail=lazy(()=>import('./pages/DishDetail'));
const Experience=lazy(()=>import('./pages/Experience'));
const About=lazy(()=>import('./pages/About'));
const Reservations=lazy(()=>import('./pages/Reservations'));

const titles:Record<string,string>={'/':'Fire-led dining','/menu':'The menu','/experience':'The experience','/about':'Our story','/reservations':'A seat at our table'};
export default function App(){
  const location=useLocation();const reduced=useReducedEffects();useSmoothScroll();
  useEffect(()=>{
    document.title=`${titles[location.pathname]||'At the table'} — EMBER`;
    window.dispatchEvent(new Event('ember-route'));
    window.scrollTo({top:0,behavior:'instant'});
  },[location.pathname]);
  return <><Header/><Preloader/>
    <AnimatePresence mode="wait" onExitComplete={()=>{window.scrollTo({top:0,behavior:'instant'});window.dispatchEvent(new Event('ember-route'));}}>
      <motion.div key={location.pathname} initial={{opacity:reduced?1:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.22}} onAnimationComplete={()=>{const el=document.querySelector<HTMLElement>('#main');el?.focus({preventScroll:true});}}>
        <motion.div className="page-curtain" aria-hidden="true" initial={{scaleY:reduced?0:1}} animate={{scaleY:0}} transition={{duration:.7,ease:[.76,0,.24,1]}}/>
        <main id="main" tabIndex={-1}><Suspense fallback={<div className="route-loading"><span className="brand">EMBER</span><p>Setting the table…</p></div>}><Routes location={location}>
          <Route path="/" element={<Home/>}/><Route path="/menu" element={<Menu/>}/><Route path="/dish/:id" element={<DishDetail/>}/><Route path="/experience" element={<Experience/>}/><Route path="/about" element={<About/>}/><Route path="/reservations" element={<Reservations/>}/>
          <Route path="*" element={<section className="not-found"><p className="eyebrow">404 · A LITTLE OFF THE BEATEN PATH</p><h1>This table<br/><em>isn't set.</em></h1><Link to="/" className="text-link"><span>Find your way home <InlineArrow/></span></Link></section>}/>
        </Routes></Suspense></main><Footer/>
      </motion.div>
    </AnimatePresence>
  </>
}
