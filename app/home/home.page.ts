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

  constructor(private route:Router,private datosService:DatosService,private copiaService:CopiaService) {
    this.init();
  }
  
  async init(){
    await this.copiaService.copiarBBDD();
    await this.datosService.openDB();
    await this.datosService.getEstudios();
  }
  public get estudios():string[] {
    return this.datosService.estudios;
  }

  public pasarEstudio(curso:String){
    let estudio:String = curso;
    let extras:NavigationExtras={
      state:{
        pasarItem:estudio,
      }
    }
    this.route.navigate(["curso"],extras);
  }

  copia(){
    this.copiaService.copiarBBDD().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }

  abrir(){
    this.datosService.openDB().then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }
}
