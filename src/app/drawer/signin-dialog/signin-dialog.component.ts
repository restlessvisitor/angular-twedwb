import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-dialog',
  templateUrl: './signin-dialog.component.html',
  styleUrls: ['./signin-dialog.component.css']
})
export class SigninDialogComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: "",
    password: ""
  });
  
  constructor(
    public dialogRef: MatDialogRef<SigninDialogComponent>,
    private formBuilder: FormBuilder,
    ) {}

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close({ event: "cancel" });
  }

  onSubmit() {
    this.dialogRef.close({ event: "login" });
  }
}