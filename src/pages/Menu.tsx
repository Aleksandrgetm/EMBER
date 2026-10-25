import { useReducedEffects } from '../components/MotionPreference';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { dishes } from '../data/menu';
import type { Dish } from '../data/menu';
import { Eyebrow, TextLink, NextChapter } from '../components/UI';
import { useEditorialMotion } from '../hooks/useMotion';

export default function Menu(){
  const root=useEditorialMotion();const reduced=useReducedEffects();const [category,setCategory]=useState('All');const [active,setActive]=useState<Dish>(dishes[0]);const [tasting,setTasting]=useState(false);
  const filtered=category==='All'?dishes:dishes.filter(d=>d.category===category);
  return <div className="menu-page" ref={root}>
    <div className="menu-masthead"><Eyebrow>THE MENU / AUTUMN — WINTER</Eyebrow><h1><span className="reveal-line"><span>Led by nature.</span></span><span className="reveal-line"><span><em>Finished by fire.</em></span></span></h1><p>What the land gives us.<br/>What the fire makes of it.</p></div>
    <div className="menu-mode" role="group" aria-label="Menu style"><button aria-pressed={!tasting} onClick={()=>setTasting(false)}>À la carte <span>01</span></button><button aria-pressed={tasting} onClick={()=>setTasting(true)}>The tasting journey <span>02</span></button><span>SEASONAL SELECTION · PRICES IN EUR</span></div>
    <AnimatePresence mode="wait">
      {!tasting?<motion.section key="carte" className="menu-browser" initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div className="menu-list"><div className="category-filter" role="group" aria-label="Filter dishes">{['All','Earth','Sea','Sweet'].map(cat=><button key={cat} aria-pressed={cat===category} onClick={()=>{setCategory(cat);setActive(cat==='All'?dishes[0]:dishes.find(d=>d.category===cat)!);}}>{cat==='All'?'All dishes':cat}</button>)}</div>
        <div aria-live="polite" className="sr-only">{filtered.length} dishes</div>{filtered.map(dish=><Link key={dish.id} to={`/dish/${dish.id}`} className={`menu-row ${active.id===dish.id?'is-active':''}`} onMouseEnter={()=>setActive(dish)} onFocus={()=>setActive(dish)}><span className="menu-number">{dish.number}</span><div><span className="eyebrow">{dish.category}</span><h2>{dish.name}</h2><p>{dish.subtitle}</p></div><span className="menu-price">€{dish.price}<ArrowUpRight size={22} strokeWidth={1}/></span></Link>)}
        <p className="menu-note">A moment in the season, always changing.<br/>Please let us know about allergies before your visit.</p></div>
        <div className="menu-preview"><AnimatePresence mode="wait"><motion.div key={active.id} initial={reduced?false:{clipPath:'inset(0 100% 0 0)'}} animate={{clipPath:'inset(0 0% 0 0)'}} exit={{opacity:0}} transition={{duration:reduced?0:.45,ease:[.22,1,.36,1]}}><img src={active.image} alt={active.subtitle}/></motion.div></AnimatePresence><div><Eyebrow>{active.number} / {active.category}</Eyebrow><p>{active.note}</p><Link to={`/dish/${active.id}`} aria-label={`Discover ${active.name}`}><ArrowUpRight strokeWidth={1}/></Link></div></div>
      </motion.section>:<motion.section key="tasting" className="tasting-panel" initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}><div><Eyebrow>TRUST THE JOURNEY</Eyebrow><h2>Six moments.<br/><em>One evening.</em></h2><p>Let the kitchen lead. A slowly unfolding conversation with the season, from the first crisp bite to the last sweet memory.</p><div className="tasting-price">€125 <span>per person · six courses</span></div><TextLink to="/reservations">Reserve the tasting experience</TextLink></div><ol>{['A welcome from the forest','Warm rye, cultured butter','The quiet earth','A northern tide','A pause of wild berries','The last light'].map((s,i)=><li key={s}><span>0{i+1}</span>{s}</li>)}</ol><p className="tasting-footnote">Approximately 2.5 hours. Optional non-alcoholic pairing + €45. A vegetarian journey is available by advance request.</p></motion.section>}
    </AnimatePresence>
    <NextChapter label="GOOD FOOD DESERVES GOOD COMPANY" to="/reservations" title="Make an evening of it."/>
  </div>
}
