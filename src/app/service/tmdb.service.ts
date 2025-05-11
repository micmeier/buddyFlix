import { Injectable } from '@angular/core';
import {TMDB, Search, Movie, MovieDetails, AppendToResponse} from 'tmdb-ts';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private tmdb: TMDB;

  constructor() {
    const apiKey: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDczZGJlNDM5YjI2OGMxNWVmMTA5YzA5ZGVlNjcyNSIsIm5iZiI6MS43NDYyOTU2NzY4MDA5OTk5ZSs5LCJzdWIiOiI2ODE2NWI3YzBkMzU2ZWU1Y2MwMzEzYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t90QjvDYhr5X-5ByD9ZJwNSQ4uCxd2BWBAFC3iV-5iI'
    this.tmdb = new TMDB(apiKey)
  }

  async searchMovie(query: string, year: number): Promise<Movie[]> {
    try {
      const movies: Search<Movie> = await this.tmdb.search.movies(
        { query: query,
          year: year,
          primary_release_year: year,
          include_adult: false
        }
      );
      return movies.results.filter(movie => movie.title.toLowerCase() === query.toLowerCase());
    } catch (err) {
      console.error('Error searching for movies:', err);
      throw err;
    }
  }
  async getMovieDetails(movieId: number): Promise<AppendToResponse<MovieDetails, ['watch/providers', 'credits'], 'movie'>> {
    try {
      // @ts-ignore
      return await this.tmdb.movies.details(movieId, ['watch/providers', 'credits'])
    } catch (err) {
      console.error('Error fetching movie details:', err);
      throw err;
    }
  }
}
