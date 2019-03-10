import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:1337/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


interface Emp {
    age: string;
    dept: string;
    docType: string;
    name: string;
}


@Component({
  selector: 'app-root',
  template: `
    <h1>Employee App</h1>
    <button (click)="queryAllEmps()">GET ALL EMPS</button>

    <table>
	  <thead>
	    <tr style="font-size: x-large; height: 50px;">
	      <td>EMPID&nbsp;&nbsp;</td>
	      <td>Age&nbsp;&nbsp;</td>
	      <td>Department&nbsp;&nbsp;</td>
	      <td>Type&nbsp;&nbsp;</td>
	      <td>Name&nbsp;&nbsp;</td>
	    </tr>
	  </thead>
	  <tbody>
	    <tr *ngFor ="let d of emps;">
	      <td>{{d.Key}}</td>
	      <td>{{d.Record.age}}</td>
	      <td>{{d.Record.dept}}</td>
	      <td>{{d.Record.docType}}</td>
	      <td>{{d.Record.name}}</td>
	    </tr>
	  </tbody>
	</table>
  `
})




export class AppComponent {
	public emps: Emp[];

	constructor(private http: HttpClient){}

	private extractData(res: Response) {
	  let body = res;
	  return body || { };
	}

	queryAllEmpsIns(): Observable<any> {
	  return this.http.get(endpoint + 'queryAllEmps').pipe(
	    map(this.extractData));
	}

	queryAllEmps() {
	    this.queryAllEmpsIns().subscribe((data: any) => {
		  this.emps = JSON.parse(data);
		  console.log(this.emps);
	    });
	}

}
