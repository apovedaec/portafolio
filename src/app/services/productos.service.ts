import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductos } from '../interfaces/info-productos.interface';
import { InfoItem } from '../interfaces/info-item.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  infoProductos: InfoProductos[] = [];
  infoFiltrados: InfoProductos[] = [];
  infoItem: InfoItem[] = [];
  cargado = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-3cc97.firebaseio.com/productos_idx.json').subscribe((resp: InfoProductos[]) => {
        this.infoProductos = resp;
        this.cargado = false;
        resolve();
    });
    });
  }

  public cargaItem(id: string) {
    return this.http.get(`https://angular-html-3cc97.firebaseio.com/productos/${id}.json`);
  }

  public buscarItem(txt: string) {

      if(this.infoProductos.length === 0) {
        this.cargarProductos().then(() => {
            this.filtrarProductos(txt);
        });
      } else {
        this.filtrarProductos(txt);
      }
  }

  private filtrarProductos(txt: string) {
    txt = txt.toLocaleLowerCase();
    this.infoFiltrados = [];
    this.infoProductos.forEach(prod => {
      const tituloLow = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(txt) >= 0 || tituloLow.indexOf(txt) >= 0) {
        this.infoFiltrados.push(prod);
      }
    });
  }
}
