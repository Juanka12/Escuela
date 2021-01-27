import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  
  private db: SQLiteObject;
  
  constructor(private platform: Platform, private sqlite: SQLite) {}

  getHorario(curso:string,grupo:string):string[][] {
    let horario=[ ['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'],['1','2','3','4','5','6'] ];
    return horario;
  }
  
  executeSentence(target:any[],sqlSentence: string, searchParam: any[]) {
    return new Promise((resolve,reject) => {
      let consultable = true;
      if (!this.db) {
        this.openDB()
        .then(()=>{
          console.log(this.db);   
        })
        .catch(() => {
          consultable = false;
          reject("Fallo al cargar");
        });
      }
      if (consultable) {
        this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          for(let i=0;i < data.rows.length;i++){
            let obj=data.rows.item(i);
            target.push(obj);
            console.log(obj);
          }
          resolve("Sentencia ejecutada");
        })
        .catch((e) => {
          console.log("fallo al ejecutar sentencia "+JSON.stringify(e));
          reject("Fallo al ejecutar sentencia");
        });
      }
    });
  }
  
  getEstudios(): string[] {
    let estudios: any[] = [];
    const sql = "select nombre from estudios";
    this.executeSentence(estudios,sql,[]);
    return estudios;
  }
  getHoras() {
    const horasList: any[] = [];
    const sql = "Select descripcion as nombre from horasSemana";
    this.executeSentence(horasList,sql,[]);
    return horasList;
  }
  getCursos(estudio) {
    const cursosList: any[] = [];
    const sql = "SELECT grupo.idGrupo as id, grupo.nombre FROM grupo INNER JOIN estudios ON grupo.idEstudios = estudios.idEstudios  WHERE estudios.nombre LIKE ?";
    this.executeSentence(cursosList,sql,[estudio]);
    return cursosList;
  }

  openDB() {
    return new Promise((resolve,reject) => {
    this.platform
      .ready()
      .then(() => {
        this.sqlite
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            resolve("DB abierta correctamente");
          })
          .catch((err) => {
            console.log(err);
            reject("Fallo al abrir DB");
          });
      })
      .catch(()=>{
        reject("Fallo al comprobar el dispositivo");
      });
    });
  }

  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  }
}
