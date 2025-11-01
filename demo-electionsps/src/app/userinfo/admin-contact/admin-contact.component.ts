import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ContactService } from 'src/app/service/contact.service';



@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
    adminContactForm!: FormGroup;
  isSaving = false;
  message = '';
  contacts: any[] = [];
  isAdmin = false;
  loading = true;

  constructor(private contactService: ContactService, private auth: AuthService,private fb: FormBuilder) {

          this.adminContactForm = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      facebook: [''],
      twitter: [''],
      instagram: ['']
    });
  }

  async ngOnInit() {
    this.isAdmin = this.auth.isLoggedIn(); // ✅ Only allow admin access
    if (this.isAdmin) {
      this.contacts = await this.contactService.getAllContacts();
    }
    this.loading = false;

     const data = await this.contactService.getAdminContactInfo();
    if (data) this.adminContactForm.patchValue(data);

    
  }

  async onSave() {
    if (this.adminContactForm.invalid) return;
    this.isSaving = true;

    try {
      await this.contactService.saveAdminContactInfo(this.adminContactForm.value);
      this.message = 'Contact info saved successfully!';
    } catch (error) {
      console.error(error);
      this.message = 'Error saving contact info.';
    } finally {
      this.isSaving = false;
    }
  }
  async saveAdminContactInfo() {
  await this.contactService.saveAdminContactInfo(this.adminContactForm.value);
  alert('Contact info updated successfully!');
}
}
