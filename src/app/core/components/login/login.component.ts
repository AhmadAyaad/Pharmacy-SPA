import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastStateEnum } from 'src/app/_models/ToastStateEnum';
import { ToastService } from 'src/app/_services/toast.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  private createLoginForm() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
    });
  }
  get formControls() {
    return this.loginFormGroup.controls;
  }
  onSubmit() {
    if (this.loginFormGroup.valid) {
      this.authService.login(this.loginFormGroup.value).subscribe(
        (res) => {
          this.router.navigate([`operations/pharmacy-product-details`]);
        },
        (err) => {
          this.toastService.showToastMessage(
            'تسجيل الدخول',
            err.error,
            ToastStateEnum.Error
          );
        }
      );
    }
  }
}
