import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Delivery } from '../../interfaces/delivery';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../../services/general.service';
import { AuthService } from '../../services/auth.service';
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
  ) {
    //this.formDireccion = this.createFormGroup();
    console.log(AuthService.user);
  }
  public deliveryObject: Delivery = {
    del_precio: 10,
    del_fentrega: null,
    del_estado: 1,
    del_deparment_id: null,
    del_province_id: null,
    del_district_id: null,
    del_calle: this.AuthService.user.usu_direccion,
  };
  public bandLinear: boolean = true;
  public ruc: string;
  public razon_social: string;
  public nombreConcatenado:string;
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
  cant = [1, 2, 3];

  direccion = new FormControl('', [Validators.required]);
  departamento = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  distrito = new FormControl('', [Validators.required]);
  telefonoFijo = new FormControl('', [Validators.required]);
  celular = new FormControl('', [Validators.required]);

  cantidad = new FormControl('', [Validators.required]);

  //validar con Gard
  
  validar() {
    if (this.deliveryObject.del_calle == null) return 'Faltan datos';
    if (this.deliveryObject.del_deparment_id == null) return 'Faltan datos';
    if (this.deliveryObject.del_district_id == null) return 'Faltan datos';
    if (this.deliveryObject.del_province_id == null) return 'Faltan datos';
    return 'ok';
  }
  continuarDespacho() {
    if (this.delivery) {
      let validacion = this.validar();
      if (validacion == 'ok') {
        this.bandLinear = true;
      } else {
        this.showMessage('Error', validacion, 'error');
      }
    } else {
    }
  }
  ngOnInit(): void {
    let items = localStorage.getItem('arreglo');
    this.prueba = JSON.parse(items);
    this.firstFormGroup = this._formBuilder.group({
      direccion: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
    });
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
  buscarSunat() {
    fetch(
      'https://dniruc.apisperu.com/api/v1/ruc/' +
        this.ruc +
        '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImZyYW5rZGVsYWNydXp1cnF1aXphQGdtYWlsLmNvbSJ9.BHlqwnoE52IhTm5_Yun2n8cpmABGitDZt10zIINFMkQ'
    )
      .then((res) => res.json())
      .then((res) => {
        this.razon_social = res.razonSocial;
      });
  }
}
