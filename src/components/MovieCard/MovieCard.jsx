import React from 'react'
import noMovie from '../../assets/images/no-movie.png'

const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language}
}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '{noMovie}'} />
    </div>
  )
}

export default MovieCard