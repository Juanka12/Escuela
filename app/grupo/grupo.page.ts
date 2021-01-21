import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {
  curso:string;
  grupo:string;
  constructor(private route:Router, private routeActive:ActivatedRoute, private datosService:DatosService) {
    this.routeActive.queryParamMap.subscribe(()=> {
      this.curso = this.route.getCurrentNavigation().extras.state.pasarCurso;
      this.grupo = this.route.getCurrentNavigation().extras.state.pasarGrupo;
    })
   }
  ngOnInit() {
  }

  public get Horario():string[][] {
    return this.datosService.getHorario(this.curso,this.grupo);
  }
}
