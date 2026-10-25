import type { KeyboardEvent } from 'react';
// Native dialog makes the background inert; explicit wrapping also keeps focus
// inside in embedded webviews whose native dialog tab cycle reaches browser chrome.
export function trapDialogFocus(event:KeyboardEvent<HTMLDialogElement>){
  if(event.key!=='Tab')return;
  const nodes=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input, select, textarea, [tabindex="0"]')).filter(el=>el.getClientRects().length>0);
  const first=nodes[0],last=nodes[nodes.length-1];
  if(!first)return;
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
}
