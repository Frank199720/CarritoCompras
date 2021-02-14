import { Pipe, PipeTransform } from '@angular/core';
import { Prueba } from 'src/app/interfaces/prueba';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(prueba: Prueba): string {
    return `assets/img/${prueba.id}.jpg` 
  }

}
