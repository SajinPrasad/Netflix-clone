import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate()
  const [video, setVideo] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjA2MWU5YTNjZTAxNDQzYTBjOTk1ODIyYWZjMjBjMyIsInN1YiI6IjY2NWI2YTYyMWMyNzI4NjEyMmE1ZjdjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eK2D4erZN98qkygVUOxckdKYlGVnHLRGS5ASQfKHkRU'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setVideo(response.results[0]))
    .catch(err => console.error(err));
  })

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate(-2)}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${video.key}`}
      title='trailer' allowFullScreen >

      </iframe>
      <div className="player-info">
        <p>{video.published_at.slice(0, 10)}</p>
        <p>{video.name}</p>
        <p>{video.type}</p>
      </div>
    </div>
  )
}

export default Player
