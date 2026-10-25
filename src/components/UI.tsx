import { useReducedEffects } from './MotionPreference';
import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import gsap from 'gsap';

export function Flame({className=''}:{className?:string}) { return <svg className={className} viewBox="0 0 32 42" fill="none" aria-hidden="true"><path d="M18 2c3 12-13 15-13 26 0 7 5 12 11 12s12-5 12-13C28 18 19 14 18 2Z" stroke="currentColor" strokeWidth="1.3"/><path d="M16 20c2 7-5 10-5 15 0 3 2 5 5 5s6-3 6-6c0-5-6-8-6-14Z" stroke="currentColor" strokeWidth="1.1"/></svg> }
export function Eyebrow({children,className=''}:{children:ReactNode;className?:string}) {return <p className={`eyebrow ${className}`}>{children}</p>}
// Match the former desktop text arrow's contour, advance, and baseline without font fallback.
export function InlineArrow(){return <svg className="inline-arrow" viewBox="0 -880 1000 1000" fill="currentColor" aria-hidden="true" focusable="false"><path transform="scale(1 -1)" stroke="currentColor" strokeWidth="25" strokeLinejoin="round" d="M75-78 861 711 871 500H900C902 622 909 690 930 810 810 789 742 782 620 780V751L831 741 46-49Z"/></svg>}
export function TextLink({to,children,className=''}:{to:string;children:ReactNode;className?:string}) {return <Link to={to} className={`text-link ${className}`}><span>{children}</span><ArrowUpRight size={17} strokeWidth={1.3}/></Link>}
export function Magnetic({children,className=''}:{children:ReactNode;className?:string}) {
  const ref=useRef<HTMLSpanElement>(null);const reduced=useReducedEffects();
  const move=(e:MouseEvent<HTMLSpanElement>)=>{if(reduced||!matchMedia('(pointer:fine)').matches)return; const b=e.currentTarget.getBoundingClientRect();gsap.to(ref.current,{x:(e.clientX-b.left-b.width/2)*.16,y:(e.clientY-b.top-b.height/2)*.16,duration:.5,ease:'power3.out'});};
  return <span ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={()=>gsap.to(ref.current,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'})}>{children}</span>
}
export function RoundLink({to,children}:{to:string;children:ReactNode}){return <Magnetic><Link className="round-link" to={to}><span>{children}</span><ArrowUpRight size={25} strokeWidth={1}/></Link></Magnetic>}
export function ScrollCue({target}:{target:string}){return <a className="scroll-cue" href={target}><span className="scroll-icon"><ArrowDown size={16} strokeWidth={1}/></span><span>SCROLL TO DISCOVER</span></a>}
export function PageHeading({eyebrow,children}:{eyebrow:string;children:ReactNode}){return <header className="page-heading"><Eyebrow>{eyebrow}</Eyebrow><h1>{children}</h1></header>}
export function NextChapter({label,to,title}:{label:string;to:string;title:string}) {return <section className="next-chapter"><Eyebrow>{label}</Eyebrow><Link to={to}><span>{title}</span><ArrowUpRight strokeWidth={.7}/></Link></section>}
