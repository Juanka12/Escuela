import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.page.html',
  styleUrls: ['./estudio.page.scss'],
})
export class EstudioPage {

  constructor(private route:Router,private datosService:DatosService) {}
  
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

}
