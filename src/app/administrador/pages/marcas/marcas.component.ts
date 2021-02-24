import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Marca } from '../../../interfaces/marca';
import { MarcaService } from '../../../services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  frmMarca:FormGroup;

  private gridApi;
  private gridColumnApi;

  columnDefs;
  defaultColDef;
  rowData: any;
  editing = false;
  accion = "";

  marca:Marca = {};
  marcaini:Marca = {};
  idMarca;
  nombreMarca;

  createFormGroup(){
    return new FormGroup({
      descripcion: new FormControl('',[Validators.required])
    });
  }
  get descripcion() { return this.frmMarca.get('descripcion'); }

  constructor(private modal: NgbModal, private marcaService:MarcaService) { 
    this.columnDefs = [
      {
        headerName: "CODIGO",
        field: 'mar_id',
        flex: 1,
        minWidth: 100
      },
      {
        headerName: "NOMBRE",
        field: 'mar_nombre',
        flex: 3,
        minWidth: 300
      }
    ];
    this.defaultColDef = { resizable:true, sortable:true };
    this.frmMarca=this.createFormGroup();
  }

  ngOnInit(): void {
  }

  getMarca(){
    this.marcaService.index().subscribe(data=>{
      this.rowData = data;
    },error=>{
      console.log('Ocurrio un error');
    });
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getMarca();
    /*this.marcaService.index().subscribe(data=>{
      this.rowData = data;
    });*/
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
        this.marca = node;
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
    if(!this.frmMarca.invalid){
      if (this.editing) {
        this.marcaService.update(this.marca, this.idMarca).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Departamento actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getMarca();
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
        this.marcaService.store(this.marca).subscribe(data=>{
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Departamento Guardado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getMarca();
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
        text: this.nombreMarca,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.marcaService.destroy(this.idMarca).subscribe((data)=>{
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              text: 'El departamento ha sido eliminado',
              showConfirmButton: false,
              timer: 1500,
            });
            this.getMarca();
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
    this.marca = this.marcaini;
    this.frmMarca.reset();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    this.idMarca = selectedData.map(node=>node.mar_id);
    this.nombreMarca = selectedData.map(node=>node.mar_nombre);
  }
}
