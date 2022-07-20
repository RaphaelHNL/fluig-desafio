import { TestBed } from '@angular/core/testing';

import { DadosService } from './dados.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  mockList,
  mockTasks,
  mockArray,
  list,
  tasks,
} from './mocks/mocksData';

describe('DadosService', () => {
  let service: DadosService;
  let httpController: HttpTestingController;

  let url = 'http://localhost:3000';

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DadosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get and return an array of lists', () => {

    service.get('lists').subscribe((res) => {
      expect(res).toEqual(mockList);
    })

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/lists`,
    });

    req.flush(mockList);
  })

  it('should call get and return an array of tasks', () => {

    service.get('tasks').subscribe((res) => {
      expect(res).toEqual(mockTasks);
    })

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/tasks`,
    });

    req.flush(mockTasks);
  })

  it('should call delete and return the list that was deleted from the API', () => {
    const id: number = 1;

    service.delete('lists', id).subscribe((res) => {
      expect(res).toEqual(mockList)
    })

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/lists/${id}`,
    });

    req.flush(mockList);
  })

  it('should call delete and return the tasks that was deleted from the API', () => {
    const id: number = 14;

    service.delete('tasks', id).subscribe((res) => {
      expect(res).toEqual(mockTasks)
    })

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/tasks/${id}`,
    });

    req.flush(mockTasks);
  })


  it('should call put and return the updated list from the API', () => {
    const updatedList: list = {
      id: 1,
      title: 'New title',
    };

    service.put('lists', 1, mockList).subscribe((res) => {
      expect(res).toEqual(updatedList);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/lists/1`,
    });

    req.flush(updatedList);
  });

  it('should call put and return the updated task from the API', () => {
    const updatedTask: tasks = {
      title: "Comprar papel",
      listId: 2,
      taskConclusion: true,
      id: 14
    };

    service.put('tasks', 14, mockTasks).subscribe((res) => {
      expect(res).toEqual(updatedTask);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/tasks/14`,
    });

    req.flush(updatedTask);
  });


  it('should call post and the API should return the list that was added', () => {
    service.post('lists',mockList).subscribe((res) => {
      expect(res).toEqual(mockList);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/lists`,
    });

    req.flush(mockList);
  });

  it('should call post and the API should return the tasks that was added', () => {
    service.post('tasks', mockTasks).subscribe((res) => {
      expect(res).toEqual(mockTasks);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/tasks`,
    });

    req.flush(mockTasks);
  });
});
