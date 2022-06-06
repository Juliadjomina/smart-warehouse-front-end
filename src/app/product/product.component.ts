import {Component, OnInit, ViewChild} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import {Product} from "../../models/product";
import {Storage} from "../../models/storage";

import {MatPaginator} from '@angular/material/paginator';

import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {StorageService} from "../service/storage.service";
import {MatSort} from "@angular/material/sort";
import {ProductService} from "../service/product.service";
import {DialogProductComponent} from "../dialog-product/dialog-product.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'serialnumber', 'dateofpurchase', 'length', 'width', 'depth', 'material', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public storageId: any = null;
  products !: Product[];
  public href: string = "";

  constructor(private router: Router,
              private api: ProductService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private apiStorage: StorageService,
              ) {
  }

  ngOnInit(): void {
    this.href = this.router.url;
    this.getAllProducts();
  }


  getAllProducts() {
    // console.log(this.api.getStorageProducts(this.id));
    this.storageId = this.route.snapshot.params['id'];
    this.apiStorage.getStorageProducts(this.storageId).subscribe({
      next: (res) => {
        // console.log(this.storageId)
        // console.log(res);
        // @ts-ignore
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while fetching the products!")
      }
    })

  }


  openDialog() {
    this.dialog.open(DialogProductComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if (val==='save'){
        this.getAllProducts();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteProduct(id: number){
    // console.log("ID");
    // console.log(id);
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Product deleted successfully!");
        this.getAllProducts();
      },
      error:()=>{
        alert("Error while deleting the product!")
      }
    })
  }
  editProduct(row : any){
    // console.log(row);
    this.dialog.open(DialogProductComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if (val==='update'){
        this.getAllProducts();
      }
    });
    this.getAllProducts();
  }
}
