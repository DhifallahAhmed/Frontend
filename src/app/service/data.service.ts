import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  registerUser(data: any){
    return this.http.post(environment.apiUrl+'/api/register/', data);
  }
  login(data:any){
    return this.http.post(environment.apiUrl+'/api/login/', data);
  }
  getData (){
    return this.http.get('http://127.0.0.1:8000/api/users') ;
  }
  deleteUser(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/deleteUser/'+id) ;
  }
  getUserById(id: any){
    return this.http.get('http://127.0.0.1:8000/api/user/'+id) ;
  }
  updateUser(id: any, data: any){
    return this.http.put('http://127.0.0.1:8000/api/updateUser/'+id, data) ;
  }
  insertHour(data: any){
    return this.http.post('http://127.0.0.1:8000/api/addHeure', data) ;
  }
  getHourData(id:any) {
    return this.http.get('http://127.0.0.1:8000/api/heures/'+id) ;
  }
  deleteHour(id: any){
    return this.http.delete('http://127.0.0.1:8000/api/deleteHeure/'+id) ;
  }
  getHourById(id: any){
    return this.http.get('http://127.0.0.1:8000/api/heure/'+id) ;
  }
  updateHour(id: any, data: any){
    return this.http.put('http://127.0.0.1:8000/api/updateHeure/'+id, data) ;
  }
}
