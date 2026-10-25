export type Dish = {
  id: string; number: string; name: string; subtitle: string; category: 'Earth' | 'Sea' | 'Sweet';
  image: string; price: number; description: string; ingredients: string[]; allergens: string; note: string;
};
export const dishes: Dish[] = [
  {id:'celeriac',number:'01',name:'The quiet earth',subtitle:'Salt-baked celeriac · black truffle · lovage',category:'Earth',image:'/images/dish.jpg',price:26,
    description:'An entire celeriac, buried in salt and left beside the embers. Hours later, the crust is broken. What remains is tender, sweet, and deeply of the earth. Finished with winter truffle and a bright whisper of lovage.',
    ingredients:['Salt-baked celeriac','Black winter truffle','Cultured cream','Lovage oil'],allergens:'Celery, milk',note:'Slow-roasted for 4 hours over birch embers.'},
  {id:'halibut',number:'02',name:'A northern tide',subtitle:'Halibut · charred leek · mussel beurre blanc',category:'Sea',image:'/images/fish.jpg',price:38,
    description:'Cold-water halibut, gently poached until it falls into pearlescent flakes. Leeks meet the hottest part of the grill. A sauce of mussels and cultured butter brings the sea to the table.',
    ingredients:['Butter-poached halibut','Charred young leek','Mussel beurre blanc','Coastal herbs'],allergens:'Fish, molluscs, milk',note:'A study in the contrast between smoke and sea.'},
  {id:'pear',number:'03',name:'The last light',subtitle:'Poached pear · buckwheat · cultured cream',category:'Sweet',image:'/images/pear.jpg',price:16,
    description:'An autumn pear, slowly poached in its own juice with smoked honey. Toasted buckwheat gives it a little resistance. Cultured cream and a paper-thin caramel shard make the last moment linger.',
    ingredients:['Orchard pear','Smoked honey','Toasted buckwheat','Cultured cream'],allergens:'Milk. Prepared in a kitchen handling nuts and gluten.',note:'A gentle ending. Never quite the same twice.'},
];
export const navigation = [{to:'/',label:'Home'}, {to:'/menu',label:'The menu'}, {to:'/experience',label:'The experience'}, {to:'/about',label:'Our story'}, {to:'/reservations',label:'A seat at our table'}];
