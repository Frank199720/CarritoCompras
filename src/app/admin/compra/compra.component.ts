import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Delivery } from '../../interfaces/delivery';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  public deliveryObject:Delivery ={
    del_precio:10,
    del_fentrega:null,
    del_estado:1,
    del_deparment_id:null,
    del_province_id:null,
    del_district_id:null,
    del_calle:null
  };
  public bandLinear:boolean = true;
 /*formDireccion: FormGroup;
  
  createFormGroup(){
    return new FormGroup({
      direccion: new FormControl('', [Validators.required]),
    });
  }

  get direccion() { return this.formDireccion.get("direccion") }*/

  prueba = [];
  delivery:Boolean=true;
  boleta:Boolean=true;
  firstFormGroup: FormGroup;
  cant=[1,2,3];

  direccion = new FormControl('',[Validators.required]);
  departamento = new FormControl('',[Validators.required]);
  provincia = new FormControl('',[Validators.required]);
  distrito = new FormControl('',[Validators.required]);
  telefonoFijo = new FormControl('',[Validators.required]);
  celular = new FormControl('',[Validators.required]);
  
  cantidad = new FormControl('',[Validators.required]);
  
//validar con Gard 
  constructor(public carService:CarService , private _formBuilder:FormBuilder) { 
    //this.formDireccion = this.createFormGroup();
  }
  validar(){
    if(this.deliveryObject.del_calle==null) return "Faltan datos";
    if(this.deliveryObject.del_deparment_id==null) return "Faltan datos";
    if(this.deliveryObject.del_district_id==null) return "Faltan datos";
    if(this.deliveryObject.del_province_id==null) return "Faltan datos";
    return "ok";
  }
  continuarDespacho(){
    if(this.delivery){
      let validacion=this.validar();
      if(validacion=="ok"){
        this.bandLinear=true;
      }else{
        this.showMessage("Error",validacion,'error');
      }
    }else{
      
    }
  }
  ngOnInit(): void {
    let items = localStorage.getItem("arreglo");
    this.prueba = JSON.parse(items);
    this.firstFormGroup = this._formBuilder.group({
      direccion: ['',Validators.required],
  departamento :['',Validators.required],
  provincia :['',Validators.required],
  distrito :['',Validators.required]
    });
  }

  aumentar(){
    console.log(this.cant[0]);
    var actual = this.cant[0]
    this.cant[0] = actual + 1;
  }

  disminuir(){
    
  }

  probar(){
    console.log("checked");
  }

  selectionChange(){
    //this.prueba[1].edad = 2;
    this.ngOnInit();
  }
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}
