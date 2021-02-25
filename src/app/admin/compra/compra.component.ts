import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Delivery } from '../../interfaces/delivery';

import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../../services/general.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario';
import { User } from '../../interfaces/user';
import { Compra } from '../../interfaces/compra';
import { DetalleCompra } from '../../interfaces/detalle-compra';
import { Provincia } from '../../interfaces/provincia';
import { Department } from '../../interfaces/department';
import { UsuarioService } from '../../services/usuario.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { Distrito } from '../../interfaces/distrito';
import { CompraService } from '../../services/compra.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  constructor(
    public carService: CarService,
    private _formBuilder: FormBuilder,
    private httpCliente: HttpClient,
    private GeneralService: GeneralService,
    private AuthService:AuthService,
    private UbicacionService:UbicacionService,
    private compraService:CompraService,
    private router:Router
  ) {
    //this.formDireccion = this.createFormGroup();
    console.log(AuthService.user);
    this.nombreConcatenado=this.usuario.usu_nombres+' '+this.usuario.usu_apellidos;
    this.getDateCurrent();
    this.firstFormGroup = this.createFormGroup1();
    this.secondFormControl = this.createFormGroup2();
    this.obtenerDptos();
    this.obtenerProvincias();
    this.obtenerDistritos();
  }
  public precioDelivery:number=10;
  /*firstFormGroup:FormGroup;
  form2:FormGroup;*/

  createFormGroup1(){
    return new FormGroup({
      direccion: new FormControl(this.AuthService.user.usu_direccion, [Validators.required]),
      departamento: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      distrito: new FormControl('', [Validators.required]),
    })
  }
  get direccion() { return this.firstFormGroup.get('direccion') }
  get departamento() { return this.firstFormGroup.get('departamento') }
  get provincia() { return this.firstFormGroup.get('provincia') }
  get distrito() { return this.firstFormGroup.get('distrito') }

  createFormGroup2(){
    return new FormGroup({
      cliente: new FormControl({ value: '', disabled: true },[Validators.required]),
      clienteEmpresa: new FormControl({ value: '', disabled: true },[Validators.required]),
      correoEmpresa: new FormControl({ value: '', disabled: true },[Validators.required]),
      celularEmpresa: new FormControl('',[Validators.required]),
      ruc: new FormControl('',[Validators.required]),
      correo: new FormControl({ value: '', disabled: true },[Validators.required]),
      dni: new FormControl({ value: '', disabled: true },[Validators.required]),
      celularPersona: new FormControl({ value: '', disabled: true },[Validators.required]),
      razonSocial: new FormControl({ value: '', disabled: true },[Validators.required])
    })
  }

  get cliente() { return this.firstFormGroup.get('cliente') }
  get clienteEmpresa() { return this.firstFormGroup.get('clienteEmpresa') }
  get correoEmpresa() { return this.firstFormGroup.get('correoEmpresa') }
  get celularEmpresa() { return this.firstFormGroup.get('celularEmpresa') }
  get ruc() { return this.firstFormGroup.get('ruc') }
  get correo() { return this.firstFormGroup.get('correo') }
  get dni() { return this.firstFormGroup.get('dni') }
  get celularPersona() { return this.firstFormGroup.get('celularPersona') }
  get razonSocial() { return this.firstFormGroup.get('razonSocial') }
  public CabeceraCompra:Compra ={
    com_comercio:null,
    com_doi:null,
    com_isdelivery:null,
    com_fecha:null,
    com_serie:null,
    com_num:null,
    com_total:null,
    com_totalneto:null,
    com_tipodoi:null,
    com_periodo:null,
    com_descuento:null,
    com_ncom:null,
    com_estado:null
  }
  public detalleCompra:DetalleCompra={
    com_num:null,
    dco_cantidad:null,
    dco_subtotal:null,
    dco_punitario:null,
  
  };
    
  public fechaActual:string;
  dateCurrent: Date = new Date();
  anio_current: string;
  current_date: string;
  public verificaPaso:boolean=false;
  public opcional :boolean = false;
  public distrito_array:Distrito[];
  public provincia_array:Provincia[];
  public departamentos:Department[];
  public deliveryObject: Delivery = {
    del_precio: 10,
    del_fentrega: null,
    del_estado: 1,
    del_deparment_id: this.AuthService.user.department_id,
    del_province_id: this.AuthService.user.province_id,
    del_district_id: this.AuthService.user.district_id,
    del_calle: this.AuthService.user.usu_direccion,
  };
  public bandLinear: boolean = false;
  public rucSunat: string;
  public razon_social: string;
  public nombreConcatenado:string;
  public usuario:User ={
    usu_dni:this.AuthService.user.usu_dni,
    usu_email:this.AuthService.user.usu_email,
    usu_apellidos:this.AuthService.user.usu_apellidos,
    usu_nombres:this.AuthService.user.usu_nombres,
    usu_telefono:this.AuthService.user.usu_telefono,
    usu_direccion:this.AuthService.user.usu_direccion,
    usu_celular:this.AuthService.user.usu_celular,
    department_id: this.AuthService.user.department_id,
    district_id:this.AuthService.user.district_id,
    province_id:this.AuthService.user.province_id
  };
  /*formDireccion: FormGroup;
  
  createFormGroup(){
    return new FormGroup({
      direccion: new FormControl('', [Validators.required]),
    });
  }

  get direccion() { return this.formDireccion.get("direccion") }*/


  prueba = [];
  delivery: Boolean = true;
  boleta: Boolean = true;
  firstFormGroup: FormGroup;
  secondFormControl:FormGroup;
  cant = [1, 2, 3];

  /*direccion = new FormControl('', [Validators.required]);
  departamento = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  distrito = new FormControl('', [Validators.required]);
  telefonoFijo = new FormControl('', [Validators.required]);
  celular = new FormControl('', [Validators.required]);
  razonSocial = new FormControl('',[Validators.required]);
  cantidad = new FormControl('', [Validators.required]);*/

  //validar con Gard
  
  validar() {
    if (this.deliveryObject.del_calle == null) return 'Faltan datos';
    if (this.deliveryObject.del_deparment_id == null) return 'Faltan datos';
    if (this.deliveryObject.del_district_id == null) return 'Faltan datos';
    if (this.deliveryObject.del_province_id == null) return 'Faltan datos';
    return 'ok';
  }

  continuarDespacho() {
    /*if (this.delivery) {
      let validacion = this.validar();
      if (validacion == 'ok') {
        this.bandLinear = true;
      } else {
        this.showMessage('Error', validacion, 'error');
      }
      this.bandLinear=true;
    } else {
      this.bandLinear=true;
    }*/
    if (!this.firstFormGroup.valid && !this.bandLinear) {
      this.showMessage('Error', 'Faltan Datos', 'error');
    }
  }
  ngOnInit(): void {
    let items = localStorage.getItem('arreglo');
    this.prueba = JSON.parse(items);
    /*this.firstFormGroup = this._formBuilder.group({
      direccion: [this.AuthService.user.usu_direccion, Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
    });
    this.firstFormGroup.get('direccion').disable();
    this.firstFormGroup.get('provincia').clearValidators();
    this.secondFormControl=this._formBuilder.group({
      cliente:['',Validators.required],
      clienteEmpresa:['',Validators.required],
      correoEmpresa:['',Validators.required],
      celularEmpresa:['',Validators.required],
      ruc:['',Validators.required],
      correo:['',Validators.required],
      dni:['',Validators.required],
      celularPersona:['',Validators.required],
      razonSocial:['',Validators.required]
    })*/
  }

  

  aumentar() {
    console.log(this.cant[0]);
    var actual = this.cant[0];
    this.cant[0] = actual + 1;
  }

  disminuir() {}

  probar() {
    console.log('checked');
  }

  selectionChange() {
    this.ngOnInit();
  }
  showMessage(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
  buscarSunat() {
    fetch(
      'https://dniruc.apisperu.com/api/v1/ruc/' +
        this.rucSunat +
        '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZyYW5rZGVsYWNydXp1cnF1aXphQGdtYWlsLmNvbSJ9.BHlqwnoE52IhTm5_Yun2n8cpmABGitDZt10zIINFMkQ'
    )
      .then((res) => res.json())
      .then((res) => {
        this.razon_social = res.razonSocial;
      });
  }
  public periodo:string;
  getDateCurrent() {
    this.anio_current = this.dateCurrent.getFullYear().toString();
    console.log(this.dateCurrent.getDate());
    let mes =
      this.dateCurrent.getMonth() + 1 >= 10
        ? (this.dateCurrent.getMonth() + 1).toString()
        : "0" + (this.dateCurrent.getMonth() + 1).toString();
    let dia =
      this.dateCurrent.getDate() >= 10
        ? this.dateCurrent.getDate().toString()
        : "0" + this.dateCurrent.getDate().toString();
    this.periodo=this.anio_current+mes;
    this.fechaActual = dia+'/'+mes+'/'+this.anio_current;
  }

  validarSecond(band:boolean){
    this.boleta=band;
    console.log(this.boleta);
    //this.secondFormControl.get('razonSocial').clearValidators();
  }

  banderas(){
    console.log("bandLinear: " + this.bandLinear);
    console.log("boleta: " + this.boleta);
    this.firstFormGroup.clearValidators();
    console.log("form1: " + this.firstFormGroup.valid);
    console.log("form2: " + this.secondFormControl.valid);
  }
  obtenerDptos(){
    this.UbicacionService.getDepartamentos().subscribe((data:Department[])=>{
      this.departamentos = data;
    });
      
    }
  
  obtenerProvincias(){
    this.UbicacionService.getProvincias(this.deliveryObject.del_deparment_id).subscribe((data:Provincia[])=>{
      this.provincia_array = data;
    });
  }
  obtenerDistritos(){
    this.UbicacionService.getDistritos(this.deliveryObject.del_province_id).subscribe((data:Distrito[])=>{
      this.distrito_array = data;
    });
  }
  guardarCompra(){
    this.CabeceraCompra.com_descuento=0;
    this.CabeceraCompra.com_fecha=this.fechaActual;
    //this.CabeceraCompra.com_periodo=this.periodo;
    this.CabeceraCompra.com_periodo=this.periodo;
    this.CabeceraCompra.com_totalneto=this.carService.totalVenta+this.precioDelivery;
    if(this.boleta) this.CabeceraCompra.ti_id=2;
    else this.CabeceraCompra.ti_id=1;
    this.CabeceraCompra.com_total=this.carService.totalVenta;
    this.CabeceraCompra.usu_dni=this.AuthService.user.usu_dni;
    if(this.boleta) {
      this.CabeceraCompra.com_doi=this.usuario.usu_dni;
      this.CabeceraCompra.com_tipodoi="DNI";
    }else{
      this.CabeceraCompra.com_doi=this.rucSunat;
      this.CabeceraCompra.com_tipodoi="RUC";
    }
    if(this.delivery){
      this.CabeceraCompra.com_isdelivery=1;
    }else{
      this.CabeceraCompra.com_isdelivery=0;
    }
    this.CabeceraCompra.com_estado="P123";
    this.CabeceraCompra.pa_id=1;
    var array=[];
    array.push(this.CabeceraCompra);
    this.carService.data.forEach(element => {
      this.detalleCompra = ({
        pro_id:element.pro_id,
        dco_cantidad:element.pro_cantidad_elegida,
        dco_subtotal:(element.pro_cantidad_elegida*element.pro_precio),
        dco_punitario:element.pro_precio
      })
      array.push(this.detalleCompra);
    });
    
    
    
    
    if(this.delivery)
    array.push(this.deliveryObject);
    let json=JSON.stringify(array);
    console.log(json);
    this.compraService.guardarCompra(json).subscribe(()=>{
        this.showMessage("Exito!","Compra realizada con exito",'success');
        localStorage.removeItem('arreglo');
        this.carService.addCarrito();
        this.carService.actualizarVenta();
        this.carService.numeroVentas=0;
        this.carService.totalVenta=0;
        this.router.navigateByUrl('/shop/principal');
    },
    (error)=>{
      console.log(error);
    })

    
  }
  
}
