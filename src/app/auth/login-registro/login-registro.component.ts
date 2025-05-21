import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.css']
})
export class LoginRegistroComponent implements OnInit {
  currentTab = 'client';
  currentClientView = 'login';

  // Client Login Form
  loginEmail = '';
  loginPassword = '';

  // Client Register Form
  registerFirstName = '';
  registerLastName = '';
  registerEmail = '';
  registerPhone = '';
  registerPassword = '';
  registerConfirmPassword = '';
  acceptTerms = false;

  // Admin Login Form
  adminUsername = '';
  adminPassword = '';
  adminRemember = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchTab(tab: string) {
    this.currentTab = tab;
    if (tab === 'client') {
      this.currentClientView = 'login';
    }
  }

  handleAction(action: string) {
    if (action === 'show-login') {
      this.currentClientView = 'login';
    } else if (action === 'show-register') {
      this.currentClientView = 'register';
    }
  }

  handleLogin() {
    console.log('Login attempt with:', {
      email: this.loginEmail,
      password: this.loginPassword
    });
    alert('Inicio de sesión exitoso. Redirigiendo...');
  }

  handleRegister() {
    if (this.registerPassword !== this.registerConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = {
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      phone: this.registerPhone,
      password: this.registerPassword,
      confirmPassword: this.registerConfirmPassword,
      acceptTerms: this.acceptTerms
    };

    console.log('Registration attempt with:', formData);
    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    this.handleAction('show-login');
    this.resetRegisterForm();
  }

  handleAdminLogin() {
    console.log('Admin login attempt with:', {
      username: this.adminUsername,
      password: this.adminPassword
    });
    alert('Acceso administrativo concedido. Redirigiendo al panel...');
  }

  resetRegisterForm() {
    this.registerFirstName = '';
    this.registerLastName = '';
    this.registerEmail = '';
    this.registerPhone = '';
    this.registerPassword = '';
    this.registerConfirmPassword = '';
    this.acceptTerms = false;
  }
}