import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from './disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  apiUrl = 'http://localhost:3000/disciplinas';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Disciplina[]>{
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  save(disciplina:Disciplina) : Observable<Disciplina>{
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }
  delete(disciplina:Disciplina) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${disciplina.id}`);
  }
  update(disciplina:Disciplina) : Observable<Disciplina>{
    return this.http.put<Disciplina>(`${this.apiUrl}/${disciplina.id}`, disciplina);
  }

}
