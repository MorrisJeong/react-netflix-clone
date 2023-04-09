import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./SearchPage.css"
import { useDebounce } from '../../hooks/useDebounce'
export default function SearchPage() {
  const [searchResults, setsearchResults] = useState([])
  const navigate = useNavigate();
 
  
  const useQuery=()=>{

    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery();
  const searchTerm = query.get("q")
  const debounceSearchTerm = useDebounce(searchTerm,500);
  useEffect(() => {
    if (debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm])

  const fetchSearchMovie= async (debounceSearchTerm)=>{
    // console.log("searchTerm", serachTerm)
    try {
      const request = await axios.get(
      `/search/multi?include_adult=false&query=${debounceSearchTerm}`
      )
      console.log(request)
      setsearchResults(request.data.results )
    } catch (error) {
      console.log("error!!")
    }
  }
  const renderSearchResults=()=>{
    return searchResults.length >0?(
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !==null && movie.media_type !== "person"){
            const movieImageUrl = 
            "https://image.tmdb.org/t/p/w500"+movie.backdrop_path
            return(
              <div className='movie' key={movie.id}>
                <div onClick={()=>navigate(`/${movie.id}`)} className='movie__column-poster'>
                  <img src={movieImageUrl} alt="move image" className="movie__poster"/>
                </div>
              </div>
            )
          }
        })}
      </section>
    ):(
    <section className='no-results'>
      <div className='no-result__text'>
        <p>
          찾고자하는 검색어"{debounceSearchTerm}" 이 없습니다.
        </p>
      </div>

    </section>
    
    )
  }
  return renderSearchResults()
}
