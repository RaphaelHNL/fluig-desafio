import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Lists {
  id: number,
  title: string
}


const urlBase = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class DadosService {

  constructor(private http: HttpClient) { }

  get(urlEndPoint: string){
    return this.http.get(`${urlBase}/${urlEndPoint}`)
  }

  post(urlEndPoint: string, body: any){
    return this.http.post(`${urlBase}/${urlEndPoint}`, body)
  }

  put(urlEndPoint: string, id: number, body: any){
    return this.http.put(`${urlBase}/${urlEndPoint}/${id}`, body)
  }

  delete(urlEndPoint: string, id: number){
    return this.http.delete(`${urlBase}/${urlEndPoint}/${id}`)
  }


}
