import {Component, OnInit, ViewChild} from '@angular/core';
import {Storage} from "../../models/storage";
import {StorageService} from "../service/storage.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MenuComponent} from "../menu/menu.component";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from '@angular/router';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.css']

})
export class StorageListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'capacity', 'action', 'products'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  storages!: Storage[];

  constructor(private storageService: StorageService,
              private api: StorageService,
              public menu: MenuComponent,
              private dialog: MatDialog,
              private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.getAllStorages();
  }

  //todo: create column 'free space'
  getFreeSpace(storage: Storage) {
  }

  btnClick(id: number) {
    const url = '/storage/' + id + '/products'
    this.router.navigateByUrl(url);
  };

  getAllStorages(): void {
    this.api.getStorageList().subscribe({
      next: (res) => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the storages!")
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllStorages();
      }
    });
  }

  deleteStorage(id: number) {
    console.log("ID");
    console.log(id);
    this.api.deleteStorage(id).subscribe({
      next: (res) => {
        alert("Storage deleted successfully!");
        this.getAllStorages();
      },
      error: () => {
        alert("Error while deleting the storage!")
      }
    })
  }

  editStorage(row: any) {
    console.log(row);
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllStorages();
      }
    });
    this.getAllStorages();
  }

}
