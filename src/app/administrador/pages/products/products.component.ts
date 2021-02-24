import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto.service';
import { Marca } from '../../../interfaces/marca';
import { Categoria } from '../../../interfaces/categoria';
import { MarcaService } from '../../../services/marca.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public rowData;
  private isEdit: boolean;
  public accion = '';
  private idProducto: number = -1;
  public marca: Marca[];
  public categoria: Categoria[];
  public search:string;
  public CategoriaSelected;
  frameworkComponents;
  gridApi;
  producto: Producto = {
    pro_nombre: null,
    pro_cantidad: null,
    pro_stock: null,
    pro_precio: null,
    mar_id: null,
    dep_id: null,
  };
  constructor(
    private modal: NgbModal,
    private ProductoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService
  ) {
    this.obtenerProductos();
    this.marcaService.index().subscribe((data: Marca[]) => {
      this.marca = data;
      console.log(data);
    });
    this.categoriaService.getCategoria().subscribe((data: Categoria[]) => {
      this.categoria = data;
    });
  }
  columnDefs = [
    { field: 'pro_id', headerName: 'CodProducto', hide: true },
    {
      field: 'pro_nombre',
      headerName: 'Producto',
      resizable: true,
      width: '300',
    },
    { field: 'dep_nombre', headerName: 'Categoria' },
    { field: 'mar_nombre', headerName: 'Marca' },
    {
      field: 'pro_precio',
      headerName: 'Precio',
      width: '100',
    },
    { field: 'pro_cantidad', headerName: 'Cantidad', width: '100' },
    { field: 'pro_stock', headerName: 'Stock mínimo', width: '150' },
    { field: 'dep_id', headerName: 'COD DEP', hide: true },
    { field: 'mar_id', headerName: 'Mar cod', hide: true },
  ];
  ngOnInit(): void {}
  selectedRow(row) {
    console.log(row);
  }
  agregarProducto(modal, band) {
    if (!band) {
      if (this.validacionClick()) {
        this.isEdit = true;
        this.producto = this.rowData.find((m) => {
          return m.pro_id == this.idProducto;
        });
        this.openModal(modal, band);
      } else {
        this.showMessage('Error', 'Seleccione una fila', 'error');
      }

      console.log(this.producto);
    } else {
      this.isEdit = false;
      this.openModal(modal,band);
    }
  }

  openModal(modal, band) {
    if (band) {
      this.accion = 'Agregar Producto';
    } else {
      this.accion = 'Edición de Producto';
    }
    this.modal.open(modal, { size: 'lg', backdrop: 'static' });
  }
  validar() {
    let resultado = 'ok';
    if (this.producto.pro_nombre === null) return 'Faltan datos';
    if (this.producto.pro_cantidad === null) return 'Faltan datos';
    if (this.producto.pro_stock === null) return 'Faltan datos';
    if (this.producto.pro_precio === null) return 'Faltan datos';
    if (this.producto.mar_id === null) return 'Faltan datos';
    if (this.producto.dep_id === null) return 'Faltan datos';
    if (this.producto.pro_stock > this.producto.pro_cantidad)
      return 'La cantidad no puede ser menor al stock mínimo ';
    if (this.producto.pro_stock == this.producto.pro_cantidad)
      return 'La cantidad no puede ser igual al stock mínimo';
    return resultado;
  }
  validarCantidades() {
    if (this.producto.pro_stock <= this.producto.pro_cantidad) return false;
    return true;
  }
  guardar() {
    let resultado = this.validar();
    if (resultado == 'ok') {
      if (this.isEdit) {
        this.ProductoService.editarProducto(this.producto).subscribe(
          (data) => {
            this.modal.dismissAll();
            this.obtenerProductos();
            this.showMessage(
              'Aviso',
              'El producto ha sido editado con éxito',
              'success'
            );
          },
          (error) => {
            console.log(error);
            this.showMessage(
              'Error' + error.status + '<br>' + error.statusText,
              'No se pudo editar el registro',
              'error'
            );
          }
        );
      } else {
        this.ProductoService.insertProducto(this.producto).subscribe(
          (data) => {
            this.modal.dismissAll();
            this.obtenerProductos();
            this.showMessage(
              'Aviso',
              'El producto ha sido guardado con éxito',
              'success'
            );
          },
          (error) => {
            console.log(error);
            this.showMessage(
              'Error' + error.status + '<br>' + error.statusText,
              'No se pudo eliminar el registro',
              'error'
            );
          }
        );
      }
    } else {
      this.showMessage('Error!', resultado, 'error');
    }
  }
  deleteProducto() {
    if (this.validacionClick()) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: 'No podras revertir la acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'De acuerdo',
      }).then((result) => {
        if (result.isConfirmed) {
          this.ProductoService.deleteProducto(this.idProducto).subscribe(
            () => {
              this.obtenerProductos();
              this.showMessage(
                'Aviso',
                'El producto ha sido eliminado con éxito',
                'success'
              );
            },
            (error) => {
              this.showMessage(
                'Error' + error.status + '<br>' + error.statusText,
                'No se pudo guardar el registro',
                'error'
              );
            }
          );
        }
      });
    } else {
      this.showMessage('Error', 'Seleccione un producto', 'error');
    }
  }
  validacionClick() {
    console.log(this.idProducto);
    if (this.idProducto == -1) return false;
    return true;
  }
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  obtenerProductos() {
    this.ProductoService.getProducto().subscribe((data) => {
      console.log(data);
      this.rowData = data;
    });
  }
  onSelectionChanged(params) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.idProducto = selectedRows[0].pro_id;
    console.log(selectedRows);
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  Busqueda(valor){
    
    if(this.CategoriaSelected===null){
      if(valor==''){
        this.obtenerProductos();
      }
      this.ProductoService.getProductoByDesc(valor).subscribe((data)=>{
        this.rowData=data;
      })
    }else{
      if(valor=='') this.ProductoService.getProductoByCategoria(this.CategoriaSelected).subscribe((data)=>
      {
        this.rowData=data;
      })
      this.ProductoService.getProductoByCategoriaDesc(valor,this.CategoriaSelected).subscribe((data)=>{
        this.rowData=data;
      })
    }
    
  }
  searchForCategory(){
    this.ProductoService.getProductoByCategoria(this.CategoriaSelected).subscribe((data)=>{
      this.rowData=data;
    })
  }

}
