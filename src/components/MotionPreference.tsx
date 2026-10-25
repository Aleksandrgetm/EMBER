import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
const Context=createContext({reduced:false,system:false,toggle:()=>{}});
export function MotionPreferenceProvider({children}:{children:ReactNode}){
  const system=!!useReducedMotion();
  const [manual,setManual]=useState(()=>{try{return localStorage.getItem('ember-reduce-motion')==='true';}catch{return false;}});
  const reduced=system||manual;
  useEffect(()=>{document.documentElement.dataset.motion=reduced?'reduce':'full';},[reduced]);
  const toggle=()=>setManual(previous=>{const value=!previous;try{localStorage.setItem('ember-reduce-motion',String(value));}catch{/* preferences are optional */}return value;});
  return <Context.Provider value={{reduced,system,toggle}}><MotionConfig reducedMotion={reduced?'always':'never'}>{children}</MotionConfig></Context.Provider>
}
export const useReducedEffects=()=>useContext(Context).reduced;
export function MotionControl(){const {reduced,system,toggle}=useContext(Context);return <button className="motion-control" aria-label="Reduce animations" aria-pressed={reduced} disabled={system} onClick={toggle}><span aria-hidden="true">{reduced?'○':'◉'}</span> {system?'REDUCED MOTION':reduced?'MOTION OFF':'MOTION ON'}</button>}
