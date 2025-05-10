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
  isEditing: boolean = false;  

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

  onClickSave() {
    this.service.save(this.formGroupDisciplina.value).subscribe({
          next: json => {
            this.disciplinas.push(json);
            this.formGroupDisciplina.reset();
          }
    });
  }

   onClickDelete(disciplina: Disciplina) {
     this.service.delete(disciplina).subscribe({
          next: () => this.loadDisciplinas()
      });
    }
    onClickUpdate(disciplina: Disciplina) {
        this.formGroupDisciplina.setValue(disciplina);
        this.isEditing=true;
      }
  
      onClickConfirmUpdate() {
        this.service.update(this.formGroupDisciplina.value)
          .subscribe({
              next: () => {
                  this.loadDisciplinas(); 
                  this.clear();
              }
          });
      }
  
      onClickClear() {
        this.clear();
      }
        
      clear(){
        this.formGroupDisciplina.reset();
        this.isEditing=false;   
      }
  
  }
  
