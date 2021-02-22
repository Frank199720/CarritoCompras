import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }
  insertProducto(producto:Producto){
    return this.HttpClient.post(this.ruta+'/productos',producto);
  }
  getProductoByCategoria(codCategoria:number){
    return this.HttpClient.get(this.ruta+'/productosbycategoria/'+codCategoria);
  }
  getProductoByCategoriaDesc(descripcion:string,codCategoria:number){
    return this.HttpClient.get(this.ruta+'/getdesProducto/'+descripcion+'/'+codCategoria);
  }
  
  getProductoByDesc(descripcion:string){
    return this.HttpClient.get(this.ruta+'/productosbydesc/'+descripcion);
  }
  getProducto(){
    return this.HttpClient.get(this.ruta+'/productos');
  }
  getProductobyId(codProducto:number){
    return this.HttpClient.get(this.ruta+'/productos/'+codProducto);
  }
  editarProducto(producto:Producto){
    return this.HttpClient.put(this.ruta+'/productos/'+producto.pro_id,producto)
  }
  deleteProducto(codProducto:number){
    return this.HttpClient.delete(this.ruta+'/productos/'+codProducto);
  }
}
