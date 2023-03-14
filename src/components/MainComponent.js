import React, { useEffect, useState } from 'react'
import CardComponent from './CardComponent'
import PokeinfoComponent from './PokeinfoComponent'
import axios from 'axios'
const MainComponent = () => {
    const [pokeData,setPokeData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [url,setUrl] =useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextURl,setNextUrl]=useState();
    const [prveUrl,setPreUrl]=useState();
    const [pokeDex,setPokeDex]=useState();


    const  pokeFun=async()=>{
        setLoading(true)
        const res = await axios.get(url);
        // console.log("data",res.data);
        setNextUrl(res.data.next);
        setPreUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
        // console.log("poke",pokeData);
    }
    const getPokemon =async(res)=>{
         res.map(async(item)=>{
            const result =await axios.get(item.url);
            // console.log("new",result);
            setPokeData(state=>{
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
            })
         })
    }
    useEffect(()=>{
        pokeFun();
    },[url])
  return (
    <>
        <div className='container'>
              <div className='left'>
                <CardComponent pokemon={pokeData} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>
                
                <div className='btn-group'>
                {  prveUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prveUrl) 
                        }}>Previous</button>}

                        { nextURl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextURl)
                        }}>Next</button>}

                </div>
              </div>
              <div className='right'>
                <PokeinfoComponent data={pokeDex}/>
              </div>
        </div>
    </>
  )
}

export default MainComponent