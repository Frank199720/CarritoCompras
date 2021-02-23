import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../../../interfaces/departamento';
import { DepartamentoService } from '../../../services/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  frmDepartamento:FormGroup;

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;
  editing = false;
  accion = "";

  departamento:Departamento = {};
  departamentoini:Departamento = {};
  idDepartamento;
  nombreDep;

  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required])
    });
  }

  get descripcion() { return this.frmDepartamento.get('descripcion'); }

  constructor(private modal: NgbModal, private departamentoService:DepartamentoService) {
    this.columnDefs = [
      {
        headerName: "CODIGO",
        field: 'dep_id',
        flex: 1,
        minWidth: 100
      },
      {
        headerName: "NOMBRE",
        field: 'dep_nombre',
        flex: 3,
        minWidth: 300
      }
    ];
    this.defaultColDef = { resizable:true, sortable:true };
    this.frmDepartamento=this.createFormGroup();
  }

  ngOnInit(): void {
  }

  getDepartamentos(){
    this.departamentoService.index().subscribe(data=>{
      this.rowData = data;
    },error=>{
      console.log('Ocurrio un error');
    });
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.departamentoService.index().subscribe(data=>{
      this.rowData = data;
    });
    console.log(this.rowData);
  }
  opensave(contenido) {
    this.editing=false;
    this.accion='Nuevo';
    this.modal.open(contenido, {backdrop: 'static'});
  }

  openedit(contenido) {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.getSelectedRows();
    if(selectedData.length > 0){
      this.editing=true;
      this.accion='Editar';
      selectedData.map((node)=>{
        this.departamento = node;
      });
      this.modal.open(contenido, { backdrop: "static" });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un departamento!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  cerrarModal() {
    this.limpiarForm();
    this.modal.dismissAll();
  }

  guardar(){
    if(!this.frmDepartamento.invalid){
      if (this.editing) {
        this.departamentoService.update(this.departamento, this.idDepartamento).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Departamento actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDepartamentos();
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      } else {
        this.departamentoService.store(this.departamento).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Departamento Guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getDepartamentos();
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'A ocurrido un error!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
      this.cerrarModal();
    } else {
      Swal.fire({
        icon:"error",
        title:'Ocurrió un error',
        text:'Hay campos invalidos'
      });
    }
  }

  eliminar() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    if(selectedData.length > 0){
      this.getSelectedRows();
      Swal.fire({
        title: '¿Esta seguro de eliminar este departamento?',
        text: this.nombreDep,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(this.dni_alumno);
          this.departamentoService.destroy(this.idDepartamento).subscribe((data)=>{
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: 'El departamento ha sido eliminado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getDepartamentos();
          },(error)=>{
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'A ocurrido un error!',
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Selecciona un departamento!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  limpiarForm(){
    this.departamento = this.departamentoini;
    this.frmDepartamento.reset();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.idDepartamento = selectedData.map(node=>node.dep_id);
    this.nombreDep = selectedData.map(node=>node.dep_nombre);
  }
}
