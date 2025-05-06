import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "professor", component: ProfessorComponent   },
  { path: "disciplina" , component: DisciplinaComponent    },
  { path: ""        , component: HomeComponent      }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
