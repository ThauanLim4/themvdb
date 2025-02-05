export async function getPopularMovies() {
    const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    return data.results;	
}

export async function GetByGenre() {
    const API_KEY = '6cab2673c87af7cea093eb14c8a77328';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await response.json();
    console.log(data);
    return data.genres;	
}

// /genre/tv/list
// https://api.themoviedb.org/3/genre/movie/list?api_key=6cab2673c87af7cea093eb14c8a77328&language=pt-BR

// export const BASE_URL = "http://www.omdbapi.com/?t=Inception&apikey=YOUR_API_KEY";