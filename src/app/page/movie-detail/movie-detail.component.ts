import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TmdbService} from '../../service/tmdb.service';
import {AppendToResponse, MovieDetails} from 'tmdb-ts';
import {Chip} from 'primeng/chip';
import {NgStyle} from '@angular/common';
import {Avatar} from 'primeng/avatar';
import {Carousel} from 'primeng/carousel';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-movie-detail',
  imports: [
    Chip, NgStyle, Carousel
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetail implements OnInit{
  private movieId!: number;
  public movieDetails: WritableSignal<AppendToResponse<MovieDetails, ['watch/providers', 'credits'], 'movie'>> = signal({} as unknown as AppendToResponse<MovieDetails, ['watch/providers', 'credits'], 'movie'>);

  constructor(
    private route: ActivatedRoute,
    private tmbdService: TmdbService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
    });
    // Fetch movie details using the movieId
    this.fetchMovieDetails(this.movieId);
  }

  private fetchMovieDetails(movieId: number): void {
    // Implement the logic to fetch movie details using the movieId
    console.log('Fetching details for movie ID:', movieId);
    this.tmbdService.getMovieDetails(movieId).then((movieDetails: AppendToResponse<MovieDetails, ['watch/providers', 'credits'], 'movie'>): void => {
      this.movieDetails.set(movieDetails);
      console.log('Movie details:', this.movieDetails());
      console.log(this.movieDetails().credits);
      console.log(this.movieDetails()['watch/providers']);
    }).catch((error) => {
      console.error('Error fetching movie details:', error);
    });
  }

  public getReleaseYear(): number {
    const releaseDate = this.movieDetails().release_date;
    if (releaseDate) {
      return new Date(releaseDate).getFullYear();
    }
    return 0; // Default value if release date is not available
  }


}
