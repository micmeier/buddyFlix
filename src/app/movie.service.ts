import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiKey: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDczZGJlNDM5YjI2OGMxNWVmMTA5YzA5ZGVlNjcyNSIsIm5iZiI6MS43NDYyOTU2NzY4MDA5OTk5ZSs5LCJzdWIiOiI2ODE2NWI3YzBkMzU2ZWU1Y2MwMzEzYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t90QjvDYhr5X-5ByD9ZJwNSQ4uCxd2BWBAFC3iV-5iI';
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query,
      },
    });
  }
}
