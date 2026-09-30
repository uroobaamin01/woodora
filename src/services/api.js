import {projects,gallery,testimonials,posts} from '../data/db.js';
// Mock REST layer with simulated latency. Products use the public DummyJSON API.
const mock=(d,ms=500)=>new Promise(r=>setTimeout(()=>r(structuredClone(d)),ms));
const find=(list,id,msg)=>{const p=list.find(x=>x.id===id);if(!p)throw new Error(msg);return mock(p,300);};
export const getProjects=()=>mock(projects);
export const getProjectById=async id=>find(projects,id,'Project not found');
export const getGallery=()=>mock(gallery,400);
export const getTestimonials=()=>mock(testimonials,400);
export const getPosts=()=>mock(posts,400);
export const getPostById=async id=>find(posts,id,'Article not found');
export async function getProducts(){
  const cats=['furniture','home-decoration','lighting'];
  const res=await Promise.all(cats.map(c=>fetch(`https://dummyjson.com/products/category/${c}?limit=8`).then(r=>{if(!r.ok)throw new Error('Could not load the collection');return r.json();})));
  return res.flatMap(r=>r.products).map(p=>({id:p.id,name:p.title,category:p.category.replace('-',' '),price:p.price,rating:p.rating,image:p.thumbnail}));
}
