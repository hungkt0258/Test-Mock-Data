import { ApiServices } from './../services/api-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dataSource: any = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'category',
    'price',
    'action',
  ];
  pageItemsLength: number;
  pageSize: number;

  keywordSearch: string = '';
  searchToLoadData = new Subject<string>();

  arrCategory = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  constructor(private api: ApiServices, public dialog: MatDialog) {}
  @ViewChild(MatSort, { static: true })
  sort: MatSort = Object.create(null);

  ngOnInit(): void {
    this.getListProduct();
    this.dataSource.sort = this.sort;
    this.searchToLoadData
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.dataSource.filter = value.trim().toLowerCase();
        // this.searchValue.emit(value);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getListProduct() {
    this.api.getListProduct().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.arrCategory = [];
      data.map((each) => {
        if (each.category) {
          this.arrCategory.push(each);
        }
      });
      this.pageItemsLength = data.length;
      this.pageSize = Math.floor(
        this.pageItemsLength / (this.pageItemsLength / 10)
      );
      this.paginator.pageSize = 10;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(type, data) {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        data: data,
        type: type,
      },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        switch (type) {
          case 'created': {
            this.createdProduct(result);
            break;
          }
          case 'update': {
            this.updateProduct(result);
            break;
          }
          case 'delete': {
            this.deleteProduct(result);
            break;
          }
          default:
            break;
        }
      }
    });
  }

  async createdProduct(data) {
    await this.api.createdProduct(data).toPromise();
    await this.getListProduct();
  }

  async updateProduct(data) {
    await this.api.updateProduct(data).toPromise();
    await this.getListProduct();
  }
  async deleteProduct(data) {
    await this.api.deleteProduct(data).toPromise();
    await this.getListProduct();
  }

  filterCategory(event) {
    if (event) {
      this.dataSource.filter = event.category.trim().toLowerCase();
    } else {
      return (this.dataSource.filter = null);
    }
  }
}
