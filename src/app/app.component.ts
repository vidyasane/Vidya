import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  responseData: any;
  tableDetails: any;
  modalRef;
  rowData: any;

  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];

  constructor(private http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    interval(10000).pipe(startWith(0), switchMap(() => this.http.get("https://hn.algolia.com/api/v1/search_by_date?tags=story"))).subscribe(response => {
      this.responseData = response;
      console.log(this.responseData, "response from the given API");
      this.tableDetails = this.responseData.hits;
    })
  }

  openModal(rowModalData, event) {
    this.modalRef = this.modalService.show(rowModalData);
    this.rowData = event;
  }

}
