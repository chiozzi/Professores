import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Disciplina } from '../disciplina';
import { ProfessorService } from '../professor.service';
import { DisciplinaService } from '../disciplina.service';

@Component({
  selector: 'app-professor',
  standalone: false,
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.css'
})
export class ProfessorComponent implements OnInit {
   
  professores: Professor[] = [];
  formGroupProfessor: FormGroup; 
  disciplinas: Disciplina[] = [];

  constructor(
    private service: ProfessorService,
    private formBuilder: FormBuilder,
    private disciplinaService: DisciplinaService
  ) {
    this.formGroupProfessor = formBuilder.group({
      id: [''],
      nome: [''],
      disciplinaId: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfessores(); // carrega a lista de professores
    this.disciplinaService.getAll().subscribe({
      next: json => this.disciplinas = json  // carrega a lista de disciplinas
    });
  }

  loadProfessores() {
    this.service.getAll().subscribe({
      next: json => this.professores = json
    });
  }

  save() {
    const professor = this.formGroupProfessor.value;
    professor.disciplinaId = Number(professor.disciplinaId);  // garante que é número
  
    this.service.save(professor).subscribe({
      next: json => {
        this.professores.push(json);
        this.formGroupProfessor.reset();
        alert('Professor cadastrado com sucesso!');
      },
      error: () => {
        alert('Erro ao cadastrar o professor.');
      }
    });
  }

  getDisciplinaNome(disciplinaId: number): string {
    const disciplina = this.disciplinas.find(d => d.id === disciplinaId);
    return disciplina ? disciplina.nome : 'Não encontrado';
  }

  delete(professor: Professor) {
    if (confirm(`Tem certeza que deseja excluir o professor "${professor.nome}"?`)) {
      this.service.delete(professor).subscribe({
        next: () => {
          this.loadProfessores();
          alert('Professor excluído com sucesso!');
        },
        error: () => {
          alert('Erro ao excluir o professor.');
        }
      });
    }
  }
}
