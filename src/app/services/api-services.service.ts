import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  constructor(private httpClient: HttpClient) {}

  getListProduct(): Observable<object> {
    return this.httpClient.get(`http://localhost:3000/products`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // createdProduct(): Observable<object> {
  //   return this.httpClient.post(`http://localhost:3000/products`).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   );
  // }
  createdProduct(data: any): Observable<Object> {
    const dataBody = {
      id: data.id,
      name: data.name,
      type: data.type,
      category: data.category,
      price: data.price,
    };
    return this.httpClient
      .post(`http://localhost:3000/products`, dataBody)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  updateProduct(data: any): Observable<Object> {
    const dataBody = {
      id: data.id,
      name: data.name,
      type: data.type,
      category: data.category,
      price: data.price,
    };
    return this.httpClient
      .put(`http://localhost:3000/products/${data.id}`, dataBody)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  deleteProduct(data: any): Observable<Object> {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   }),
    //   body: {},
    // };
    return this.httpClient
      .delete(`http://localhost:3000/products/${data.id}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
