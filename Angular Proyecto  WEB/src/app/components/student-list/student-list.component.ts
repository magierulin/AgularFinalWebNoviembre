import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
    studentList: Student[] = [];
    id2: number | undefined;
    dni2: string ;
    lastName2: string ;
    firstName2: string ;
    email2: string ;

    dni: string = '';
    lastName: string = '';
    firstName: string = '';
    email: string = '';

    constructor(private studentService: StudentService, private modalService: NgbModal) { }

    ngOnInit(): void {
        this.loadStudents();
    }

    loadStudents(): void {
        this.studentService.getAllStudents().subscribe(
            (response: Student[]) => {
                this.studentList = response;
            },
            error => {
                console.error(error);
                alert('Error: ' + error.error.message);
            }
        );
    }

    save() {
      
      let student = new Student()
      student.dni = this.dni
      student.lastName = this.lastName
      student.firstName = this.firstName
      student.email = this.email
      student.cohort = 0
      student.status = 'activo'
      student.gender = 'masculino'
      student.address = 'abc123'
      student.phone = '000'
      this.studentService.addStudent(student).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
        document.getElementsByTagName('input')[0].focus()
      })
    
  }

    delete(studentId: number): void {
        if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) { //pregunta 
            this.studentService.deleteStudent(studentId).subscribe(
                () => {
                    this.studentList = this.studentList.filter(student => student.id !== studentId);
                },
                error => {
                    console.error(error);
                    alert('Error: ' + error.error.message);
                }
            );
        }
    }

    view(content: any, student: Student): void {
      this.id2 = student.id;
      this.dni2 = student.dni;
      this.lastName2 = student.lastName;
      this.firstName2 = student.firstName;
      this.email2 = student.email;
  
      const modalRef = this.modalService.open(content, { centered: true });
  
      modalRef.result.then(() => {
          
          if (this.isDataModified(student)) {
              // Si los datos han sido modificados, realizar la actualización
              this.updateStudentData(student.id, this.dni2, this.lastName2, this.firstName2, this.email2);
          }
      }, () => {
         
      });
  }
  
  private isDataModified(student: Student): boolean {
      // Comprueba si los datos han sido modificados
      return (
          this.dni2 !== student.dni ||
          this.lastName2 !== student.lastName ||
          this.firstName2 !== student.firstName ||
          this.email2 !== student.email
      );
  }
  
  private updateStudentData(id: number, dni: string, lastName: string, firstName: string, email: string): void {
      // Realiza la actualización de los datos utilizando el servicio
      const updatedStudent: Student = {
          id: id,
          dni: dni,
          lastName: lastName,
          firstName: firstName,
          email: email,
          cohort: 0,
          status: 'activo',
          gender: 'masculino',
          address: 'abc123',
          phone: '000'
      };
  
      this.studentService.updateStudent(id, updatedStudent).subscribe(
          () => {
              
              console.log('Datos actualizados exitosamente');
              this.loadStudents(); // Recargar la lista de estudiantes después de la actualización
          },
          error => {
              console.error(error);
              alert('Error: ' + error.error.message);
          }
      );
  }

   
}
