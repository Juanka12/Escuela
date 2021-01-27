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

  constructor(private route:Router,private datosService:DatosService,private copiaService:CopiaService) {}

  ngOnInit(): void {
    this.copia();
    this.abrir();
  }

  public get estudios():string[] {
    return this.datosService.getEstudios();
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
