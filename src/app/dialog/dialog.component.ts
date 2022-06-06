import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, Form} from "@angular/forms";
import {StorageService} from "../service/storage.service";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  storageForm !: FormGroup;
  actionBtn : string = 'Save';
  constructor(private formBuilder : FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private api :StorageService,
              private  dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.storageForm = this.formBuilder.group({
      id: [''],
      name : ['', Validators.required],
      capacity : ['', Validators.required]
    })

    if(this.editData){
      this.actionBtn = 'Update';
      this.storageForm.controls['id'].setValue(this.editData.id);
      this.storageForm.controls['name'].setValue(this.editData.name);
      this.storageForm.controls['capacity'].setValue(this.editData.capacity);
    }
  }

  addStorage(): void{
    if (!this.editData){
      if(this.storageForm.valid){
        this.api.createStorage(this.storageForm.value).subscribe({
          next:(res)=> {
            alert("Storage is added!");
            this.storageForm.reset();
            this.dialogRef.close('save');

          },
          error:()=>{
            alert("Error while adding the storage!")
          }
        })
      }
    } else {
      this.updateStorage();
    }
  }

  updateStorage(){
    console.log(this.storageForm.value);
    this.api.updateStorage(this.storageForm.value).subscribe({
      next:(res)=>{
        alert("Storage updated successfully!");
        this.storageForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating!")
      }
    })
  }
}
