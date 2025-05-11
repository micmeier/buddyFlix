import {Component, OnInit, resource, ResourceRef, signal, WritableSignal, effect} from '@angular/core';
import {TextareaModule} from 'primeng/textarea';
import {InputGroup} from 'primeng/inputgroup';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {MovieCardComponent} from '../../component/movie-card/movie-card.component';
import {TmdbService} from '../../service/tmdb.service';
import {Movie} from 'tmdb-ts';
import {MovieRecommendation} from '../../model/movie-recommendation.model';
import { runFlow } from 'genkit/beta/client';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [
    TextareaModule,
    InputGroup,
    Button,
    FloatLabel,
    MovieCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class Homepage {
  movies: WritableSignal<Movie[]> = signal([]);
  request = signal('Random movies');
  promptText = new FormControl('');

  movieResource = resource({
    request: () => this.request(),
    loader: ({request}) => runFlow({ url: 'movies', input: request })
  });


  constructor(private tmdbService: TmdbService) {
    effect(() => {
      this.fetchMovies(this.movieResource.value()?? []);
    });

  }

  public onSearch(): void {
    const request = this.promptText.value as string
    this.request.set(request);
    console.log("request", request);
  }

  private async fetchMovies(movieRecommendations: MovieRecommendation[]): Promise<void> {
    try {
      const moviePromises = movieRecommendations.map((movie: MovieRecommendation): Promise<Movie[]> =>
        this.tmdbService.searchMovie(movie.title, movie.year)
      );

      const results = await Promise.all(moviePromises);
      this.movies.set(results.flat());
      console.log('Fetched movies:', this.movies());
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
}
