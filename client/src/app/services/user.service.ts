import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ApplicationConstants } from './../constant/application-constant';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  login(body): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.login, body);
  }

  signup(body): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.signup, body);
  }

  getAllUsers(body): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.findAllUsers, body);
  }

  getUserdetail(): Observable<any> {
    let username = localStorage.getItem('username');
    return this.apiService.get(ApplicationConstants.API_PATH.getuser + '/' + username, new HttpParams());
  }

  updateuser(data): Observable<any> {
    return this.apiService.put(ApplicationConstants.API_PATH.updateuser, data);
  }

  updatePic(data): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.updatepic, data);
  }

  deleteTask(data): Observable<any> {
    return this.apiService.patch(ApplicationConstants.API_PATH.deletetask, data);
  }
  editTask(data): Observable<any> {
    return this.apiService.patch(ApplicationConstants.API_PATH.edittask, data);
  }
  searchTask(data): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.searchtask, data);
  }
  findAllTask(data): Observable<any> {
    return this.apiService.get(ApplicationConstants.API_PATH.findalltask, data);
  }
  addTask(data): Observable<any> {
    return this.apiService.patch(ApplicationConstants.API_PATH.addtask, data);
  }
  updateAccountStatus(data): Observable<any> {
    return this.apiService.patch(ApplicationConstants.API_PATH.statuschange, data);
  }
  updateNotificationSetting(data): Observable<any> {
    return this.apiService.patch(ApplicationConstants.API_PATH.settingchange, data);
  }
  searchByName(data): Observable<any> {
    return this.apiService.post(ApplicationConstants.API_PATH.searchbyname, data);
  }


}
