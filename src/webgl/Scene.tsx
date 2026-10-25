import { useReducedEffects } from '../components/MotionPreference';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';

import * as THREE from 'three';

class CanvasBoundary extends Component<{children:ReactNode;fallback?:ReactNode},{failed:boolean}>{
  state={failed:false};static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?(this.props.fallback??null):this.props.children;}
}
const vertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`
  uniform sampler2D uTexture; uniform float uTime; uniform vec2 uPointer; uniform vec2 uResolution; uniform float uImageAspect;
  varying vec2 vUv;
  void main(){
    vec2 uv=vUv; float aspect=uResolution.x/uResolution.y;
    if(aspect>uImageAspect){uv.y=(uv.y-.5)*uImageAspect/aspect+.5;}else{uv.x=(uv.x-.5)*aspect/uImageAspect+.5;}
    float proximity=1.0-smoothstep(0.,.45,distance(vUv,uPointer));
    float heat=smoothstep(.3,.7,uv.x)*(1.-smoothstep(.65,1.,uv.y));
    vec2 ripple=vec2(sin(uv.y*32.+uTime*.7),cos(uv.x*25.-uTime*.8));
    uv+=ripple*(.0018*heat+.003*proximity);
    vec3 c=texture2D(uTexture,clamp(uv,0.,1.)).rgb;
    gl_FragColor=vec4(c,1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;
function HeatImage({cursor}:{cursor:{current:THREE.Vector2}}){
  const texture=useTexture('/images/hero.jpg');const {viewport,size}=useThree();
  texture.colorSpace=THREE.SRGBColorSpace;
  const uniforms=useMemo(()=>({uTexture:{value:texture},uTime:{value:0},uPointer:{value:new THREE.Vector2(.5,.5)},uResolution:{value:new THREE.Vector2(size.width,size.height)},uImageAspect:{value:texture.image.width/texture.image.height}}),[texture,size]);
  useFrame(({clock})=>{uniforms.uTime.value=clock.elapsedTime;uniforms.uPointer.value.lerp(cursor.current,.035);});
  return <mesh scale={[viewport.width,viewport.height,1]}><planeGeometry args={[1,1]}/><shaderMaterial uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} depthWrite={false}/></mesh>
}
const emberVertex=`varying vec3 vPos; varying vec3 vNormal; uniform float uTime;
void main(){vPos=position;vec3 p=position;float n=sin(p.x*7.)*sin(p.y*8.)*sin(p.z*6.);p+=normal*(n*.04+sin(p.x*2.8+1.)*sin(p.y*3.2)*cos(p.z*2.)*.18);vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
const emberFragment=`varying vec3 vPos; varying vec3 vNormal;uniform float uTime;
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
void main(){
vec3 p=vPos*5.;vec3 cell=floor(p);vec3 f=fract(p);float d1=8.;float d2=8.;
for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)for(int z=-1;z<=1;z++){vec3 g=vec3(float(x),float(y),float(z));vec3 o=vec3(hash(cell+g),hash(cell+g+13.),hash(cell+g+47.));float d=length(g+o-f);if(d<d1){d2=d1;d1=d;}else if(d<d2){d2=d;}}
float cracks=1.-smoothstep(.018,.07,d2-d1);float pulse=.72+.28*sin(uTime*.65+vPos.y*3.);
float light=max(dot(normalize(vNormal),normalize(vec3(-.4,.8,1.))),0.);
vec3 stone=vec3(.012,.01,.008)*(.4+light*1.8)+vec3(.004)*hash(floor(vPos*90.));
vec3 glow=vec3(1.7,.055,.001)*cracks*pulse;
float rim=pow(1.-max(dot(normalize(vNormal),vec3(0.,0.,1.)),0.),3.);
gl_FragColor=vec4(stone+glow+vec3(.12,.035,.005)*rim*.3,1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
function Ember({progress,cursor}:{progress:{current:number};cursor:{current:THREE.Vector2}}){
  const mesh=useRef<THREE.Mesh>(null);const sparks=useRef<THREE.Points>(null);
  const uniforms=useMemo(()=>({uTime:{value:0}}),[]);
  const positions=useMemo(()=>{const a=new Float32Array(65*3);for(let i=0;i<65;i++){const n=i*2.399963;a[i*3]=Math.sin(n)*2.4;a[i*3+1]=(i/65-.5)*5;a[i*3+2]=Math.cos(n)*1.8;}return a;},[]);
  useFrame(({clock,camera},delta)=>{
    const px=cursor.current.x*2-1;const py=cursor.current.y*2-1;
    uniforms.uTime.value=clock.elapsedTime;
    if(sparks.current){sparks.current.rotation.y=clock.elapsedTime*.025;sparks.current.position.y=Math.sin(clock.elapsedTime*.3)*.15;}
    if(mesh.current){mesh.current.rotation.y=clock.elapsedTime*.09+progress.current*1.4+px*.2;mesh.current.rotation.z=.2+Math.sin(clock.elapsedTime*.2)*.06;mesh.current.rotation.x=progress.current*.6+py*.1;}
    camera.position.z=THREE.MathUtils.damp(camera.position.z,4.6-progress.current*.9,2,delta);camera.position.x=THREE.MathUtils.damp(camera.position.x,px*.2,2,delta);camera.lookAt(0,0,0);
  });
  return <><Float speed={1.3} rotationIntensity={0} floatIntensity={.45}><mesh ref={mesh} scale={[.88,1.17,.83]}><icosahedronGeometry args={[1.05,5]}/><shaderMaterial vertexShader={emberVertex} fragmentShader={emberFragment} uniforms={uniforms}/></mesh></Float><points ref={sparks}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#cf8047" size={.016} transparent opacity={.55} sizeAttenuation/></points></>
}
export default function Scene({mode='ember'}:{mode?:'hero'|'ember'}){
  const root=useRef<HTMLDivElement>(null);const progress=useRef(0);const cursor=useRef(new THREE.Vector2(.5,.5));const [visible,setVisible]=useState(false);const [mounted,setMounted]=useState(false);const [lost,setLost]=useState(false);const reduced=useReducedEffects();
  useEffect(()=>{
    const el=root.current;if(!el||reduced)return;
    const observer=new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting);if(entry.isIntersecting)setMounted(true);},{rootMargin:'100px'});observer.observe(el);
    const scroll=()=>{const r=el.getBoundingClientRect();progress.current=THREE.MathUtils.clamp((innerHeight-r.top)/(innerHeight+r.height),0,1);};
    window.addEventListener('scroll',scroll,{passive:true});scroll();
    const move=(event:PointerEvent)=>{cursor.current.set(event.clientX/innerWidth,1-event.clientY/innerHeight);};
    window.addEventListener('pointermove',move,{passive:true});
    return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('pointermove',move);};
  },[reduced]);
  return <div ref={root} className={`webgl-scene webgl-${mode}`} aria-hidden="true">
    {mode==='ember'&&(reduced||lost)&&<div className="ember-static"><span>✳</span></div>}
    {!reduced&&!lost&&mounted&&<CanvasBoundary fallback={mode==='ember'?<div className="ember-static"><span>✳</span></div>:null}><Canvas dpr={[1,1.5]} frameloop={visible?'always':'never'} camera={{position:[0,0,4.6],fov:38}} gl={{alpha:true,antialias:false,powerPreference:'low-power'}} onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',()=>setLost(true),{once:true});}}><Suspense fallback={null}>{mode==='hero'?<HeatImage cursor={cursor}/>:<Ember progress={progress} cursor={cursor}/>}</Suspense></Canvas></CanvasBoundary>}
  </div>
}
