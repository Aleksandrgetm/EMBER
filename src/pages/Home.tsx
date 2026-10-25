import { useReducedEffects } from '../components/MotionPreference';
import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dishes } from '../data/menu';
import { Eyebrow, Flame, TextLink, RoundLink, ScrollCue } from '../components/UI';
import { useEditorialMotion } from '../hooks/useMotion';
const Scene=lazy(()=>import('../webgl/Scene'));

export default function Home(){
  const root=useEditorialMotion();const courses=useRef<HTMLElement>(null);const reduced=useReducedEffects();
  useLayoutEffect(()=>{
    if(reduced)return;
    const mm=gsap.matchMedia();
    mm.add('(min-width: 960px)',()=>{
      const track=courses.current?.querySelector<HTMLElement>('.course-track');
      if(!track||!courses.current)return;
      const tween=gsap.to(track,{x:()=>-Math.max(0,track.scrollWidth-window.innerWidth+80),ease:'none',scrollTrigger:{trigger:courses.current,start:'top top',end:()=>'+='+Math.max(600,track.scrollWidth-window.innerWidth),pin:true,scrub:.7,invalidateOnRefresh:true}});
      return()=>{tween.scrollTrigger?.kill();tween.kill();};
    });
    const t=setTimeout(()=>ScrollTrigger.refresh(),500);
    return()=>{clearTimeout(t);mm.revert();};
  },[reduced]);
  return <div ref={root}>
    <section className="home-hero">
      <div className="hero-photo"><img src="/images/hero.jpg" alt="A chef finishes a dish beside the open hearth at EMBER" fetchPriority="high"/>{!reduced&&<Suspense fallback={null}><Scene mode="hero"/></Suspense>}</div>
      <div className="hero-shade"/>
      <div className="hero-topline"><span><i/> FIRE-LED DINING</span><span>RĪGA, LATVIA</span></div>
      <div className="hero-copy"><Eyebrow>ROOTED IN NATURE. REFINED BY FIRE.</Eyebrow><h1><span className="reveal-line"><span>A little wild.</span></span><span className="reveal-line"><span><em>Deeply</em> refined.</span></span></h1><div className="hero-description"><span className="fine-line"/><p>An intimate dialogue between the season,<br className="desktop-break"/> the flame, and the people around the table.</p></div><TextLink to="/menu">Discover our menu</TextLink></div>
      <div className="hero-bottom"><ScrollCue target="#philosophy"/><span className="hero-season">AUTUMN — WINTER<br/><b>COLLECTION No. 01</b></span><RoundLink to="/reservations">A seat at<br/>our table</RoundLink></div>
      <div className="hero-vertical" aria-hidden="true">FIRE. SEASON. INSTINCT.</div>
    </section>
    <div className="ticker" aria-hidden="true"><div>{[0,1,2,3].map(i=><span key={i}>GUIDED BY THE SEASON <Flame/> SHAPED BY THE FLAME <Flame/></span>)}</div></div>
    <section id="philosophy" className="philosophy section-shell">
      <div className="section-number"><span>01 / THE ELEMENTS</span><span>NOTHING EXTRA. NOTHING MISSING.</span></div>
      <div className="philosophy-grid"><div className="philosophy-title" data-reveal><h2>Before the plate.<br/>Before the recipe.<br/><em>There was fire.</em></h2></div><div className="ember-frame">{reduced?<div className="ember-static"><Flame className="fallback-flame"/></div>:<Suspense fallback={<Flame className="fallback-flame"/>}><Scene/></Suspense>}<span className="object-caption">BIRCH EMBER · 640°C<br/><i>Move closer. Stay curious.</i></span></div><div className="philosophy-copy"><Eyebrow>OUR FIRST INGREDIENT</Eyebrow><p>We cook with the oldest ingredient of all. A living flame. It asks us to slow down, to pay attention, to let nature lead.</p><p className="muted">At EMBER, the familiar becomes unexpected. Baltic ingredients. A curious spirit. Nothing between you and the moment.</p><TextLink to="/about">The story behind the flame</TextLink></div></div>
    </section>
    <section ref={courses} className="courses-section">
      <div className="courses-heading"><div><Eyebrow>02 / A TASTE OF THE SEASON</Eyebrow><h2>Nature writes<br/><em>the menu.</em></h2></div><div className="courses-intro"><p>Three expressions of a changing landscape.<br/>An invitation to follow your instinct.</p><TextLink to="/menu">Explore the menu</TextLink></div><ArrowRight className="course-direction" strokeWidth={1}/></div>
      <div className="course-track">{dishes.map((dish,i)=><Link to={`/dish/${dish.id}`} key={dish.id} className={`course-panel course-panel-${i}`}><div className="course-image"><img src={dish.image} alt={dish.subtitle} loading="lazy" width="1672" height="941"/><span className="image-view">Discover the dish <ArrowUpRight size={20}/></span></div><div className="course-caption"><div><span className="eyebrow">{dish.number} / {dish.category}</span><h3>{dish.name}</h3><p>{dish.subtitle}</p></div><ArrowUpRight strokeWidth={1}/></div></Link>)}</div>
      <div className="courses-foot"><span>SEASONAL BY NATURE</span><span>OUR INGREDIENTS CHANGE. OUR CURIOSITY DOESN'T.</span></div>
    </section>
    <section className="home-room"><div className="room-photo"><img data-parallax src="/images/room.jpg" alt="Candlelit tables and curved walnut seating in an intimate dining room" loading="lazy" width="1672" height="941"/></div><div className="room-content"><Eyebrow>03 / MORE THAN AN EVENING</Eyebrow><h2>Come for the fire.<br/><em>Stay for the feeling.</em></h2><p>Low light. Warm wood. The quiet rhythm of a kitchen.<br/>A place for conversations that outlast the candles.</p><TextLink to="/experience">Step inside our world</TextLink></div><span className="room-caption">24 SEATS. ENDLESS POSSIBILITIES.</span></section>
    <section className="home-invitation section-shell"><Flame/><Eyebrow>THE BEST PART IS STILL TO COME</Eyebrow><h2>We'll keep<br/><em>a place for you.</em></h2><TextLink to="/reservations">Find your evening</TextLink><p>Wednesday — Sunday · From 18:00</p></section>
  </div>
}
