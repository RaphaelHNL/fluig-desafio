import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { AddNewItemComponent } from '../add-new-item/add-new-item.component';
import { DadosService } from '../dados.service';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allLists: any = [];
  errorMessage: boolean = false;

  constructor(
    private dadosService: DadosService,
    public dialog: MatDialog
    ) { 
    }

  ngOnInit(): void {

    forkJoin({
      lists: this.dadosService.get('lists'),
      tasks: this.dadosService.get('tasks')
    }).subscribe(res => {
      this.allLists = (res.lists as any).map((list: { tasks: any; allTesteTask: any[]; id: any; }) => {
        list.tasks = (res.tasks as any).filter((tasks: { listId: any; }) => tasks.listId === list.id);
        return list;
      })    
    },
    error => {
      if(error){
        this.errorMessage = true;
      }
    })

  }

  addNewItemDialog(newItem: any, index?: number): void {
    const newItemDialogRef = this.dialog.open(AddNewItemComponent, {
      width: '320px',
      data: {newItem, index}
    });
    newItemDialogRef.afterClosed().subscribe(result => {
    });
  }

  editItemDialog(editItem: any, index?: number, name?: string, listId?: number, taskConclusion?: boolean): void {
    const editItemDialogRef = this.dialog.open(EditItemComponent, {
      width: '250px',
      data: {editItem, index, name, listId, taskConclusion}
    });

    editItemDialogRef.afterClosed().subscribe(result => {
    });
  }

  deleteItem(item: string, itemId: any){
    this.dadosService.delete(item,itemId).subscribe(res => {
      setTimeout(() => {
        location.reload();
      }, 1200)
    },
    error => {
      if(error){
        location.reload();
      }
    })
  }

  taskConclusion(event:any){
    setTimeout(() => {
      this.dadosService.put('tasks', event.id, event).subscribe(res => {
        setTimeout(() => {
          location.reload();
        }, 1200)
      },
      error => {
        console.log(error)
      })
    }, 100)
  }

}
