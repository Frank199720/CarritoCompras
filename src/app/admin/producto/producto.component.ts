import { Component, OnInit } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';
import { PruebaService } from 'src/app/services/prueba.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  prueba: Prueba[] = [];
  producto: Producto[];
  termino: string;
  categoriaSelected;
  constructor(
    private pruebaService: PruebaService,
    private activateRoute: ActivatedRoute,
    public productoService: ProductoService
  ) {
    this.categoriaSelected = this.activateRoute.snapshot.paramMap.get('id');
    this.productoService.getProductoByCategoria(this.categoriaSelected).subscribe((data:Producto[]) => {
      this.producto = data;
      this.productoService.productoData=data;
      console.log(this.categoriaSelected);
      console.log(this.producto)
    });
  }

  ngOnInit(): void {
    
    
  }
  buscando() {
    if (this.termino == '') {
      this.pruebaService.getPrueba().subscribe((data: Prueba[]) => {
        this.prueba = data;
        console.log(data);
      });
    }
    this.pruebaService.getBusqueda(this.termino).subscribe((data: Prueba[]) => {
      this.prueba = data;
    });
    console.log('xd');
  }
  clear() {
    this.termino = '';
    this.pruebaService.getPrueba().subscribe((data: Prueba[]) => {
      this.prueba = data;
    });
  }
  
}
