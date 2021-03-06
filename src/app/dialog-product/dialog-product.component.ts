import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../service/storage.service";
import {ProductComponent} from "../product/product.component";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {

  actionBtn: string = 'Save';
  startDate = new Date();
  productForm !: FormGroup;
  id !: number;
  currentLocation = window.location;
  storage !: Object;

  products !: any;


  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private api: ProductService,
              private dialogRef: MatDialogRef<ProductComponent>,
              private apiStorage: StorageService) {
  }

  ngOnInit(): void {
    this.id = Number(this.currentLocation.pathname.charAt(9))

    this.apiStorage.getStorageById(this.id).subscribe({
      next: (res) => {
        this.storage = res;
      }
    });

    this.apiStorage.getStorageProducts(this.id).subscribe({
      next: (res) => {
        this.products = res;
      }
    });


    this.productForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      serialNumber: [''],
      dateOfPurchase: [''],
      length: [''],
      width: [''],
      depth: [''],
      material: [''],
      storageId: this.id,
    })

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['serialNumber'].setValue(this.editData.serialNumber);
      this.productForm.controls['dateOfPurchase'].setValue(this.editData.dateOfPurchase);
      this.productForm.controls['length'].setValue(this.editData.length);
      this.productForm.controls['width'].setValue(this.editData.width);
      this.productForm.controls['depth'].setValue(this.editData.depth);
      this.productForm.controls['material'].setValue(this.editData.material);
      this.productForm.controls['storageId'].setValue(this.id);
    }
  }


  addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        // @ts-ignore
        if (this.products.length < this.storage['capacity']){
          this.api.createProduct(this.productForm.value).subscribe({
            next: (res) => {
              alert("Product is added!");
              this.productForm.reset();
              this.dialogRef.close('save');

            },
            error: () => {
              alert("Error while adding the product!")
            }
          })
        } else {
          alert("No free space!")
          this.dialogRef.close();
        }

      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert("Product updated successfully!");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error while updating!")
      }
    })
  }

}
