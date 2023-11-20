import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiUrl = 'https://backend-idra-production.up.railway.app'
    constructor(private http: HttpClient) { }

    //---servicios-- 
    //para traer los estudiantes
    getAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.apiUrl}/student/getAll`);
    }
    
    //para agregar 
    addStudent(student: Student): Observable<any> {
      return this.http.post(`${this.apiUrl}/student`,student);
    }

    //actualizar 
    updateStudent(id: number, updatedStudent: Student): Observable<Student> {
        return this.http.post<Student>(`${this.apiUrl}/student/${id}/update`, updatedStudent);
    }

    //para eliminar
    deleteStudent(id: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/student/${id}/delete`, {});
    }
  }
