import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CopiaService } from '../services/copia.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private datosService:DatosService,private copiaService:CopiaService) {}

  copia(){
    this.copiaService.copiarBBDD().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }

 async  abrir(){
    await this.datosService.openDB().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
    this.datosService.getEstudios();
  }
}
