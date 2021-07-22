import React, { useEffect,useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow';
import FeaturedMovie from './Components/FeaturedMovie';
import Header from './Components/Header';

export default function myFunc() {

    const [movieList,setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader,setblackHeader] = useState(false);

    useEffect(()=>{
        const loadAll = async () => { 
            //pegando a lista total 
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter(i=>i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(()=> {

        const scrollListener = () => {
            if(window.scrollY> 10){
                setblackHeader(true);
            } else {
                setblackHeader(false);
            }
        }
        window.addEventListener('scroll',scrollListener);
        return () => {
            window.removeEventListener('scroll',scrollListener);
        }
    },[]);

    return (
        <div className="page">

            <Header black={blackHeader} />

            {featuredData &&
            <FeaturedMovie item={featuredData} />
            }
            
           <section className="list">
               {movieList.map((item,key)=>(
                   <di>
                    <MovieRow key={key} title={item.title} items={item.items} />
                   </di>
               ))}
           </section>

           <footer>
               Feito com <span role="img" aria-label="coração">❤️</span> pela B7Web <br/>
               Diretos de imagem para Netflix <br/>
               Dados pegos do site Themoviedb.org<br/>
               Feito pela @AlineAlmeida<br/>
           </footer>

           {movieList.length <= 0 &&
           <div className="loading">
               <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
           </div>
        }
        </div>
    );
}