import {useEffect,useState,useCallback} from 'react';
export default function useFetch(fn,arg){
  const [s,set]=useState({data:null,loading:true,error:null});
  const run=useCallback(()=>{set({data:null,loading:true,error:null});fn(arg).then(data=>set({data,loading:false,error:null})).catch(e=>set({data:null,loading:false,error:e.message}));},[fn,arg]);
  useEffect(run,[run]);return {...s,retry:run};
}
export function useLocalStorage(key,init){
  const [v,setV]=useState(()=>{try{return JSON.parse(localStorage.getItem(key))??init}catch{return init}});
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);return [v,setV];
}
