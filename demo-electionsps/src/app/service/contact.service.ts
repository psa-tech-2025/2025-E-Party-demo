// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { Firestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private storage: Storage, private firestore: Firestore) {}

  // ✅ Upload file (image or PDF)
  async uploadFile(folder: string, file: File): Promise<string> {
    const filePath = `${folder}/${uuidv4()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }

  // ✅ Save user contact form data
  async saveContactData(contact: any): Promise<void> {
    const contactRef = collection(this.firestore, 'contacts');
    await addDoc(contactRef, contact);
  }

  // ✅ Get all user-submitted contact data (for admin view)
  async getAllContacts(): Promise<any[]> {
    const contactRef = collection(this.firestore, 'contacts');
    const snapshot = await getDocs(contactRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // ✅ Admin updates contact info (address, email, social links)
  async saveAdminContactInfo(data: any): Promise<void> {
    const contactInfoRef = doc(this.firestore, 'config/contactInfo');
    await setDoc(contactInfoRef, data, { merge: true });
  }

  // ✅ Fetch dynamic contact info (shown to users)
  async getAdminContactInfo(): Promise<any | null> {
    const contactInfoRef = doc(this.firestore, 'config/contactInfo');
    const snapshot = await getDoc(contactInfoRef);
    return snapshot.exists() ? snapshot.data() : null;
  }
}
