import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  values: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValue();
  }
  getValue() {
    console.log(new Date().toLocaleString());
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response) => {
        console.log(new Date().toLocaleString());

        this.values = response;
      },
      (error) => {
        console.log('erroreeeee');
        console.log(error);
      }
    );
    console.log(new Date().toLocaleString());
    this.http.get('http://localhost:5000/api/values').subscribe(
      (response) => {
        console.log(new Date().toLocaleString());
        this.values = response;
      },
      (error) => {
        console.log('erroreeeee');
        console.log(error);
      }
    );

    console.log('dopo');
  }
}
