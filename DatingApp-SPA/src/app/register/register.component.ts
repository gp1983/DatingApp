import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {



  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get password2() { return this.userForm.get('password2'); }
  get gender() { return this.userForm.get('gender'); }
  get knownAs() { return this.userForm.get('knownAs'); }
  get DateOfBirth() { return this.userForm.get('DateOfBirth'); }
  get city() { return this.userForm.get('city'); }
  get country() { return this.userForm.get('country'); }

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService, private router: Router
  ) { }


  model: any = {};
  // public username = new FormControl('');
  @Input()
  valuesFromHome: any;
  @Output()
  CancelRegisterMode = new EventEmitter();


  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    gender: new FormControl('', Validators.required),
    knownAs: new FormControl(''),
    DateOfBirth: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  }, this.comparePassowrds);




  ngOnInit(): void {

  }

  register() {

    if (this.userForm.valid) {

      this.authService.register(this.userForm.value).subscribe(
        next => {
          this.authService.login(next).subscribe(
            () => { },
            (error) => this.alertify.error(error),
            () => {
              this.router.navigate(['/member']);
            }
          );
        },
        error => this.alertify.error(error)
      )
      console.log(this.userForm.value);

      // let user = Object.assign(new User(), this.userForm.value);
      // user.copyInto(this.userForm.value);

    }
    // console.log(this.userForm.value);
    // this.authService.register(this.model).subscribe(
    //   (next) => {
    //     console.log('registered in succesfully!');
    //     this.alertify.success('registered in succesfully!');
    //   },
    //   (error) => {
    //     this.alertify.error(error);
    //     // console.log(error);
    //   }
    // );
  }

  cancel() {
    this.CancelRegisterMode.emit(false);
  }

  checkPasswor(control: AbstractControl) {
    const ciao = 0;
    // const merda = new ValidationErrors();
    return { foo: 2118, bar: 2118 };
  }
  comparePassowrds(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const password2 = control.get('password2');

    return password && password2 && password.value !== password2.value ? { passwordsDifferent: true } : null;
  }

}



