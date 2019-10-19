import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) {}

  get(url: string, params: HttpParams) : Observable<any> {
    return this.httpClient.get(url, {params});
  }

  getList(url: string, params: HttpParams) : Observable<any> {
    const ob = this.httpClient.get(url, {params});
   // const res1 = ob.pipe(filter(x=>x.status == "pending"));
   // const res2 = ob.pipe(filter(x=>x.status == "approved"));
    return of (
      {
       // pending: res1,
       // approve: res2
      }
    )
  }

  post(url: string, body: any): Observable<any>{
    return this.httpClient.post(url, body, {headers: this.buildHeader()});
  }

  put(url: string, body: any): Observable<any>{
    return this.httpClient.put(url, body, {headers: this.buildHeader()});
  }

  buildHeader() {
    let myHeaders = new HttpHeaders();
    myHeaders.append('Content-Type', 'application/json');
    return myHeaders;
  }
}
