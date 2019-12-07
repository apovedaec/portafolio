import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina;
  infoEquipo: InfoEquipo;
  cargado = false;

  constructor(private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
        this.cargado = true;
        this.info = resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-3cc97.firebaseio.com/equipo.json').subscribe((resp: InfoEquipo) => {
        this.cargado = true;
        this.infoEquipo = resp;
    });
  }
}
