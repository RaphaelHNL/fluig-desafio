import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  public label: string = '';
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dadosService: DadosService,
  ) {
    this.form = this.formBuilder.group({
      title: [null],
      listId: [null],
      taskConclusion: [null]
    })
   }

  ngOnInit(): void {
    if(this.data.editItem === 'tasks'){
      this.label = 'Novo nome para a tarefa';
    }else{
      this.label = 'Novo nome para a lista';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  editList(){
    if(this.data.listId){
      this.form.value.listId = this.data.listId;
      this.form.value.taskConclusion = this.data.taskConclusion;
    }

    this.dadosService.put(this.data.editItem, this.data.index, this.form.value).subscribe(res => {
      setTimeout(() => {
        location.reload();
      }, 1200)
    })
  }

}
