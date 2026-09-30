import {useEffect,useRef,useState} from 'react';
export default function useReveal(){const ref=useRef(null);const [on,set]=useState(false);
useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){set(true);io.disconnect();}},{threshold:.2});io.observe(el);return()=>io.disconnect();},[]);return [ref,on];}
