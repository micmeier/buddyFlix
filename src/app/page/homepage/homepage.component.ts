import {Component, OnInit} from '@angular/core';
import {TextareaModule} from 'primeng/textarea';
import {InputGroup} from 'primeng/inputgroup';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {MovieCardComponent} from '../../component/movie-card/movie-card.component';
import {TmdbService} from '../../service/tmdb.service';
import {Movie} from 'tmdb-ts';
import {MovieRecommendation} from '../../model/movie-recommendation.model';
import {signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [
    TextareaModule,
    InputGroup,
    Button,
    FloatLabel,
    MovieCardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage implements OnInit{
  movies: WritableSignal<Movie[]> = signal([]);

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    const movieRecommendations: MovieRecommendation[] = [
      { title: 'Inception', release_year: 2010 },
      { title: 'The Matrix', release_year: 1999 },
      { title: 'Interstellar', release_year: 2014 },
      { title: 'The Dark Knight', release_year: 2008 },
      { title: 'Pulp Fiction', release_year: 1994 }
    ];

    this.fetchMovies(movieRecommendations);
  }

  private async fetchMovies(movieRecommendations: MovieRecommendation[]): Promise<void> {
    try {
      const moviePromises = movieRecommendations.map((movie: MovieRecommendation): Promise<Movie[]> =>
        this.tmdbService.searchMovie(movie.title, movie.release_year)
      );

      const results = await Promise.all(moviePromises);
      this.movies.set(results.flat());
      console.log('Fetched movies:', this.movies());
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
}
