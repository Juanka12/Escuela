import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  
  private db: SQLiteObject;
  private horasList: any[] = [];
  
  constructor(private platform: Platform, private sqlite: SQLite) {}

  getHorario(curso:string,grupo:string):string[][] {
    let horario=[ ['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'] ];
    return horario;
  }

  getGrupos(estudio: string): string[] {
    let grupos=['1','2','3','4'];
    return grupos;
  }

  getEstudios(): string[] {
    let estudios=['bac','div','eso'];
    return estudios;
  }

  /*
  Este servicio supone que se ha copiado la bbdd
  */
  /*
   *Platform nos dice si el la plataforma a usar esta lista, entre otras cosas.
   */
  /*
  Un objeto SQLite se encarga de gestionar la bbdd
  */
  async executeSentence(target:any[],sqlSentence: string, searchParam: any[]) {
    let consultable = true;
    if (!this.db) {
      await this.openDB()
        .then(()=>{
          console.log(this.db);          
        })
        .catch(() => {
          consultable = false;
        });
    }
    if (consultable) {
      this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for(let i=0;data.rows.length;i++){
            let obj=data.rows.item(i);
            target.push(obj);
          }
        })
        .catch((e) => {
          console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
        });
    }
  }

  getHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    this.executeSentence(this.horasList,sql,[]);

  }

  async openDB() {
    await this.platform
      .ready()
      .then(async () => {
        //si la plataforma esta preparada voy a abrir la bbdd ya copiada
        await this.sqlite
          //si la bbdd no existe la crea y la abre y si existe la abre
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch();
  }

  private getConector() {
    return {
      name: "Horario16e.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
