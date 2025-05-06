import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from './professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  apiUrl = 'http://localhost:3000/professores';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Professor[]>{
    return this.http.get<Professor[]>(this.apiUrl);
  }

  save(professor:Professor) : Observable<Professor>{
    return this.http.post<Professor>(this.apiUrl, professor);
  }
  delete(professor:Professor) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${professor.id}`);
  }
  update(professor:Professor) : Observable<Professor>{
    return this.http.put<Professor>(`${this.apiUrl}/${professor.id}`, professor);
  }

}
