import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  curso:string;
  constructor(private route:Router, private routeActive:ActivatedRoute, private datosService:DatosService) {
    this.routeActive.queryParamMap.subscribe(()=> {
      this.curso = this.route.getCurrentNavigation().extras.state.pasarItem;
    })
   }

  ngOnInit() {
  }

  public get Grupos():string[]{
    return this.datosService.getGrupos(this.curso);
  }
  public pasarGrupo(grupo:String){
    let estudio:String = grupo;
    let extras:NavigationExtras={
      state:{
        pasarGrupo:estudio,
        pasarCurso:this.curso,
      }
    }
    this.route.navigate(["grupo"],extras);
  }
}
