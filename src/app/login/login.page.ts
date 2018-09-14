import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoadingService } from '../services/loading/loading.service';
import { LoginService } from '../services/login/login.service';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  private form: FormGroup;
  private registerForm: FormGroup;
  private willRegister: boolean = false;

  constructor(
    private menuCtrl: MenuController,
    private loading: LoadingService,
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router,
    private session: SessionService,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });

    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      password2: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      dateOfBirth: [{ value: '', disabled: false}, [
        Validators.required,
      ]]
    },
    {
      validator: PasswordValidation.MatchPassword
    }
  );
  }

  get email() {
    if (!this.willRegister) {
      return this.form.get('email');
    }
    else {
      return this.registerForm.get('email');
    }

  }

  get password() {
    if (!this.willRegister) {
      return this.form.get('password');
    }
    else {
      return this.registerForm.get('password');
    }
  }

  get name() {
    return this.registerForm.get('name');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  ngOnInit(){
    
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.session.terminate();
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  register() {
    this.willRegister = !this.willRegister;

  }

  submitLoginHandler() {
    this.loading.present('crescent', 'Logging you in...').then(() => {
      this.login.auth(this.form.value).subscribe(
        (res: any) => {
          this.session.save(this.form.value.email, res.token);
          this.router.navigateByUrl('/home');
          this.loading.dismiss();
        }, (err) => {
          this.loading.dismiss();
          let error_message = "Something went wrong, please try again later";
          this.toast.present(err.error.email || err.error.password || error_message);
        });
    });
  }

  submitRegisterHandler() {
    this.loading.present('crescent', 'Preparing your new account...').then(() => {
      this.login.register(this.form.value).subscribe(
        (res: any) => {
          this.session.save(this.form.value.email, res.token);
          this.router.navigateByUrl('/home');
          this.loading.dismiss();
        }, (err) => {

          this.loading.dismiss();
          let error_message = "Something went wrong, please try again later";
          this.toast.present(err.error.name || err.error.email || err.error.password || err.error.password2 || err.error.dateOfBirth || error_message);
        });
    });
  }

}

export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('password2').value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get('password2').setErrors({ MatchPassword: true })
    } else {
      return null
    }
  }
}