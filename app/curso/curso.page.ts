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
  nombresGrupos:string[] = [];

  constructor(private route:Router, private routeActive:ActivatedRoute, private datosService:DatosService) {
    this.routeActive.queryParamMap.subscribe(()=> {
      this.curso = this.route.getCurrentNavigation().extras.state.pasarItem;
    });
  }
  
  ngOnInit() {
    this.datosService.getCursos(this.curso).then((res)=>{
      for (let index = 0; index < this.datosService.cursosList.length; index++) {
        this.nombresGrupos.push(this.datosService.cursosList[index].nombre);
      }
    }).catch();
  }

  public get Grupos(){
    console.log(this.nombresGrupos);
    
    return this.nombresGrupos;
  }
  public pasarGrupo(grupo:String){
    let estudio:String = grupo;
    let extras:NavigationExtras={
      state:{
        pasarGrupo:estudio,
      }
    }
    this.route.navigate(["grupo"],extras);
  }
}
