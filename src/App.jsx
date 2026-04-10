import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Search from './components/Search/Search';
import Spinner from './components/Spinner/Spinner';
import MovieCard from './components/MovieCard/MovieCard';
import {useDebounce} from 'react-use';
import { updateSearchCount } from './appwrite';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500,[searchTerm])

  const getMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');    
    try{
      setIsLoading(true);
      setErrorMessage('');
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
      `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]); }
      }
    catch(error){
      console.log(`Error fetching movies  1${error}`)
      setErrorMessage('Error fetching movies. Please try again later.')
    } finally{
      setIsLoading(false)
    }
  }

  useEffect( () => {
    getMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  
  return (
    <main>
      <div className='pattern'></div>
      <div className='wrapper'>
      <Header />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className='all-movies'>
        <h2>All Movies</h2>
        {isLoading ? (
          <Spinner />
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (<ul>
          {movieList.map((movie) =>(
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>)}
      </section>
    </div>
    </main>
  )
}

export default App