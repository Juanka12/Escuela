import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.page.html',
  styleUrls: ['./estudio.page.scss'],
})
export class EstudioPage implements OnInit{

  nombres:Array<string> = new Array<string>();

  constructor(private route:Router,private datosService:DatosService) {}

  ngOnInit(): void {
    for (let index = 0; index < this.datosService.estudios.length; index++) {
      this.nombres.push(this.datosService.estudios[index].nombre);
    }
  }
  public get estudios():string[] {
    return this.nombres;
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
