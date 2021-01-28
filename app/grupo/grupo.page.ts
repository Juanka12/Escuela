import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {

  grupo:string;
  horas:string[] = [];
  materias:string[] = [];

  constructor(private route:Router, private routeActive:ActivatedRoute, private datosService:DatosService) {
    this.routeActive.queryParamMap.subscribe(()=> {
      this.grupo = this.route.getCurrentNavigation().extras.state.pasarGrupo;
    })
   }
  ngOnInit() {
    this.horas=this.datosService.getHoras();
  }

  public get Horario() {
    return this.datosService.getHorario(this.grupo);
  }
}
