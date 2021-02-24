import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private categoriaService:CategoriaService, private productoService:ProductoService) { }
  public categoria:Categoria[];
  ngOnInit(): void {
    this.categoriaService.getCategoria().subscribe((data:Categoria[])=>{
      this.categoria=data;
    })
  }
  llenarDataProducto(item_dep){
    this.productoService.getProductoByCategoria(item_dep).subscribe((data:[]) => {
      this.productoService.productoData=data;
      
      
    });
  }
}
