import {Component, input, InputSignal} from '@angular/core';
import {Movie} from 'tmdb-ts';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  public movie: InputSignal<Movie> = input.required<Movie>();

  public getReleaseYear(): number {
    const releaseDate = this.movie().release_date;
    if (releaseDate) {
      return new Date(releaseDate).getFullYear();
    }
    return 0; // Default value if release date is not available
  }
}
