import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {
  
  public label: string = '';
  form: FormGroup;
  constructor(
    private dadosService: DadosService,
    public dialogRef: MatDialogRef<AddNewItemComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      title: [null],
      listId: [null],
      taskConclusion: [null]
    })
   }

  ngOnInit(): void {
    if(this.data.newItem === 'tasks'){
      this.label = 'Adicionar uma nova tarefa';
    }else{
      this.label = 'Adicionar uma nova lista';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewList(){
    if(this.data.index){
      this.form.value.listId = this.data.index;
      this.form.value.taskConclusion = false;
    }
    this.dadosService.post(this.data.newItem, this.form.value).subscribe(
      res => {
        setTimeout(() => {
          location.reload();
        }, 1200)
      }
    )
  }

}
