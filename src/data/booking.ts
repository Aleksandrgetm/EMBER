// Booking rules use the restaurant's clock, independent of the visitor's timezone.
export function restaurantClock(now = new Date()) {
  const values = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
  return {date:`${values.year}-${values.month}-${values.day}`,time:`${values.hour}:${values.minute}`};
}
const iso = (d:Date) => d.toISOString().slice(0,10);
export function maxBookingDate(now = new Date()) {
  const d = new Date(restaurantClock(now).date+'T12:00:00Z');const day=d.getUTCDate();
  d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+3);
  const last=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();
  d.setUTCDate(Math.min(day,last));return iso(d);
}
export function nextServiceDate(now = new Date()) {
  const d=new Date(restaurantClock(now).date+'T12:00:00Z');
  do {d.setUTCDate(d.getUTCDate()+1);} while([1,2].includes(d.getUTCDay()));
  return iso(d);
}
export function validateBookingDate(date:string,time:string,now = new Date()):string|null {
  const clock=restaurantClock(now);const parsed=new Date(date+'T12:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(parsed.getTime())||iso(parsed)!==date||date<clock.date||date>maxBookingDate(now))
    return 'Please choose a date within the next three months.';
  if([1,2].includes(parsed.getUTCDay())) return 'The hearth rests on Mondays and Tuesdays. Please choose Wednesday to Sunday.';
  if(!['18:00','18:30','19:00','19:30','20:00','20:30'].includes(time)) return 'Please choose one of the evening times.';
  if(date===clock.date&&time<=clock.time) return 'This time has passed in Rīga. Please choose a later evening.';
  return null;
}
