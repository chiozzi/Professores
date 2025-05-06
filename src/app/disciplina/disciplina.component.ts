import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../disciplina';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisciplinaService } from '../disciplina.service';

@Component({
  selector: 'app-disciplina',
  standalone: false,
  templateUrl: './disciplina.component.html',
  styleUrl: './disciplina.component.css'
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[] = [];
  formGroupDisciplina: FormGroup;
  editingDisciplina: Disciplina | null = null;  

  constructor(private service: DisciplinaService,
    private formBuilder: FormBuilder
  ){
    this.formGroupDisciplina = formBuilder.group({
      id: [''],
      nome: [''],
      level: [''],
      cargaHoraria: [''], 
      tipo: ['']
    });
  }

  ngOnInit(): void {
    this.loadDisciplinas();
  }

  loadDisciplinas() {
    this.service.getAll().subscribe({
      next: json => this.disciplinas = json
    });
  }

  save() {
    if (this.editingDisciplina) {
      this.service.update(this.formGroupDisciplina.value).subscribe({
        next: () => {
          this.loadDisciplinas();
          this.formGroupDisciplina.reset();
          this.editingDisciplina = null;
          alert('Disciplina atualizada com sucesso!');
        },
        error: () => {
          alert('Erro ao atualizar a disciplina.');
        }
      });
    } else {
      this.service.save(this.formGroupDisciplina.value).subscribe({
        next: json => {
          this.disciplinas.push(json);
          this.formGroupDisciplina.reset();
          alert('Disciplina cadastrada com sucesso!');
        },
        error: () => {
          alert('Erro ao cadastrar a disciplina.');
        }
      });
    }
  }

  edit(disciplina: Disciplina) {
    this.formGroupDisciplina.setValue(disciplina);
    this.editingDisciplina = disciplina;
  }

  delete(disciplina: Disciplina) {
    if (confirm(`Tem certeza que deseja excluir a disciplina "${disciplina.nome}"?`)) {
      this.service.delete(disciplina).subscribe({
        next: () => {
          this.loadDisciplinas();
          alert('Disciplina excluída com sucesso!');
        },
        error: () => {
          alert('Erro ao excluir a disciplina.');
        }
      });
    }
  }
}
    