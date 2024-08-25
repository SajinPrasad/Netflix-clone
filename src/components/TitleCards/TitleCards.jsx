import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const cardsRef = useRef()
  const [movies, setMovies] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjA2MWU5YTNjZTAxNDQzYTBjOTk1ODIyYWZjMjBjMyIsInN1YiI6IjY2NWI2YTYyMWMyNzI4NjEyMmE1ZjdjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eK2D4erZN98qkygVUOxckdKYlGVnHLRGS5ASQfKHkRU'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${category ? category:'now_playing'}?language=en-US&page=1`, options);
      const data = await response.json();
      setMovies(data.results);
    }
  
    if (category) {
      fetchData();
    }
  
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [category])

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {
          movies.map((card) => {
            return (
              <Link to={`/player/${card.id}`} className="card" key={card.id}>
                <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
                <p>{card.original_title}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default TitleCards
