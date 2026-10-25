import { useReducedEffects } from '../components/MotionPreference';
import { useEffect, useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const reduced = useReducedEffects();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({duration:1.05, smoothWheel:true, syncTouch:false, anchors:true});
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time:number) => lenis.raf(time * 1000);
    const reset = () => lenis.scrollTo(0, {immediate:true});
    gsap.ticker.add(tick);
    window.addEventListener('ember-route',reset);
    return () => {gsap.ticker.remove(tick);window.removeEventListener('ember-route',reset);lenis.destroy();};
  }, [reduced]);
}

export function useEditorialMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedEffects();
  useLayoutEffect(() => {
    if (reduced || !root.current) return;
    let enter: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll('.reveal-line > span');
      const intro = gsap.from(lines, {yPercent:110, rotate:2, duration:1.15, stagger:.13, ease:'power4.out', delay:.12, paused:true});
      let waiting = false;
      try { waiting = !!root.current!.querySelector('.home-hero') && !sessionStorage.getItem('ember-entered'); } catch { /* a short entrance still works without storage */ }
      if (waiting) { enter = () => intro.play(); window.addEventListener('ember-ready', enter, {once:true}); }
      else intro.play();
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
        gsap.fromTo(el, {clipPath:'inset(12% 0 12% 0)', y:35}, {clipPath:'inset(0% 0 0% 0)', y:0, duration:1.2, ease:'power3.out', scrollTrigger:{trigger:el,start:'top 90%',once:true}});
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
        gsap.fromTo(el, {yPercent:-6}, {yPercent:6,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => { if(enter) window.removeEventListener('ember-ready',enter); ctx.revert(); };
  }, [reduced]);
  return root;
}
