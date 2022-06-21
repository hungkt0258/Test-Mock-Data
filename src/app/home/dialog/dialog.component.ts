import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  action: any;
  dataItem: any;
  itemForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    type: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
  });

  isDisable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data.type;
    if (this.action == 'read') {
      this.isDisable = true;
    }
    this.dataItem = data.data;
    this.setExistedItem();
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const data = this.itemForm.getRawValue();
    this.dialogRef.close(data);
  }

  setExistedItem() {
    if (this.dataItem) {
      this.itemForm.controls.id.setValue(this.dataItem.id);
      this.itemForm.controls.name.setValue(this.dataItem.name);
      this.itemForm.controls.type.setValue(this.dataItem.type);
      this.itemForm.controls.category.setValue(this.dataItem.category);
      this.itemForm.controls.price.setValue(this.dataItem.price);
    }
  }
}
