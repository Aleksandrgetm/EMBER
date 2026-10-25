import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { dishes } from '../data/menu';
import { Eyebrow, TextLink } from '../components/UI';
import { useEditorialMotion } from '../hooks/useMotion';
export default function DishDetail(){
  const {id}=useParams();const dish=dishes.find(d=>d.id===id);const root=useEditorialMotion();
  if(!dish)return <div className="not-found"><h1>This dish has<br/><em>left the season.</em></h1><TextLink to="/menu">Return to the menu</TextLink></div>;
  const next=dishes[(dishes.indexOf(dish)+1)%dishes.length];
  return <div className="dish-page" ref={root}><Link className="dish-back" to="/menu"><ArrowLeft size={16}/> Back to the menu</Link><section className="dish-hero"><div className="dish-portrait" data-reveal><img src={dish.image} alt={dish.subtitle} fetchPriority="high"/><span>EMBER / SEASONAL STUDY No. {dish.number}</span></div><div className="dish-copy"><Eyebrow>{dish.number} / {dish.category} / AUTUMN — WINTER</Eyebrow><h1 className="reveal-line"><span>{dish.name.split(' ').slice(0,-1).join(' ')}<br/><em>{dish.name.split(' ').slice(-1)}</em></span></h1><p className="dish-subtitle">{dish.subtitle}</p><span className="dish-price">€{dish.price}</span><p className="dish-description">{dish.description}</p><TextLink to="/reservations">Experience it at our table</TextLink></div></section><section className="dish-composition"><Eyebrow>THE COMPOSITION</Eyebrow><div><h2>Considered.<br/><em>Never complicated.</em></h2><p>{dish.note}</p></div><ul>{dish.ingredients.map((x,i)=><li key={x}><span>0{i+1}</span>{x}</li>)}</ul><p className="allergen-note"><strong>Allergens</strong> {dish.allergens}. Please discuss dietary requirements with us before your visit.</p></section><Link className="next-dish" to={`/dish/${next.id}`}><img src={next.image} alt="" loading="lazy"/><div><Eyebrow>NEXT EXPRESSION / {next.number}</Eyebrow><span>{next.name}</span></div><ArrowUpRight strokeWidth={.8}/></Link></div>
}
