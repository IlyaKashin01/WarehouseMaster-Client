import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AvatarModule } from 'primeng/avatar';
import { DataService } from '../services/data.service';
import { PersonResponse } from '../models/auth/auth';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ToggleButtonModule,
    AvatarModule,
    DialogModule,
    CommonModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  visible: boolean = false;

  person: PersonResponse = this.dataService.getPerson();

  showDialog() {
      this.visible = true;
  }
  visiblePass: boolean = false;

  showDialogPass() {
      this.visiblePass = true;
  }
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      notifications: [true]  // This can be changed to a boolean toggle
    });
  }

  ngOnInit(): void {
    // Load initial values, e.g., from a service
    this.loadSettings();
  }

  loadSettings(): void {
    // Placeholder for loading settings from a service
    const settings = {
      username: 'User',
      email: 'user@example.com',
      notifications: true
    };
    this.settingsForm.setValue(settings);
  }

  saveSettings(): void {
    if (this.settingsForm.valid) {
      const updatedSettings = this.settingsForm.value;
      console.log('Settings saved:', updatedSettings);
      // Save the settings, e.g., via a service
    }
  }
}
