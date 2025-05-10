import { Component, OnInit } from '@angular/core';
import { Professor } from '../professor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfessorService } from '../professor.service';

@Component({
  selector: 'app-professor',
  standalone: false,
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.css'
})
export class ProfessorComponent implements OnInit {
   
  professores: Professor[] = [];
  formGroupProfessor: FormGroup; 
  isEditing: boolean = false;

  constructor(
    private service: ProfessorService,
    private formBuilder: FormBuilder,
  ) {
    this.formGroupProfessor = formBuilder.group({
      id: [''],
      nome: [''],
      disciplina: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfessores(); // carrega a lista de professores
  }

  loadProfessores() {
    this.service.getAll().subscribe({
      next: json => this.professores = json
    });
  }

  onClickSave() {
    this.service.save(this.formGroupProfessor.value).subscribe({
          next: json => {
            this.professores.push(json);
            this.formGroupProfessor.reset();
          }
    });
  }

  onClickDelete(professor: Professor) {
   this.service.delete(professor).subscribe({
        next: () => this.loadProfessores()
    });
  }
  onClickUpdate(professor: Professor) {
      this.formGroupProfessor.setValue(professor);
      this.isEditing=true;
    }

    onClickConfirmUpdate() {
      this.service.update(this.formGroupProfessor.value)
        .subscribe({
            next: () => {
                this.loadProfessores(); 
                this.clear();
            }
        });
    }

    onClickClear() {
      this.clear();
    }
      
    clear(){
      this.formGroupProfessor.reset();
      this.isEditing=false;   
    }

}

