import { Injectable } from '@angular/core';
import {TMDB, Search, Movie, MovieDetails, AppendToResponse} from 'tmdb-ts';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private tmdb: TMDB;

  constructor() {
    const apiKey: string = ''
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
