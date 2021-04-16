import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Employee } from 'src/app/_models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFunctions } from '../_helpers/modal-functions';
import { DatatableLanguage } from '../_helpers/datatable-language';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  formEmployee = this.formBuilderForControl.group({
    id: [''],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.minLength(4)]],
  });
  employeesList: Employee[] = [];
  employee: Employee = new Employee();
  isFormSubmitted: boolean = false;

  constructor(
    private formBuilderForControl: FormBuilder,
    private employeeService: EmployeeService,
    private modalFunctions: ModalFunctions,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    // this.getAllCategories();
    this.dtOptions = {
      language: DatatableLanguage.datatableFrench,
      lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "Tout"]],
    };
  }

  // remplissage du tableau
  getAllCategories(): void {
    this.employeeService.getAll().subscribe(
      (data) => {
        this.employeesList = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // soumission du formulaire
  onSubmit() {
    this.isFormSubmitted = true;
    console.warn(this.formEmployee.value);
    this.formEmployee.reset();

    if (this.formEmployee.value.id == "") {
      // create employee
      this.employeeService.create(this.formEmployee.value).subscribe(
        (response) => {
          console.log(response);
          this.getAllCategories();
          this.formEmployee.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // update employee
      this.employeeService.update(this.formEmployee.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    this.modalService.dismissAll('Dismissed after saving data');
  }

  // updateModal(id: number, content: any) {
  //   this.categorie = this.categories?.find(s => s.id == id);
  //   this.formAddCat.setValue({
  //     id: this.categorie?.id,
  //     libelle: this.categorie?.libelle,
  //     description: this.categorie?.description,
  //   });
  //   this.modalFunctions.open(content);
  // }


  // MODAL FUNCTION

  createModal(content: any) {
    this.modalFunctions.open(content);
  }

  getDismissReason(reason: any) {
    this.modalFunctions.getDismissReason(reason);
  }
}
