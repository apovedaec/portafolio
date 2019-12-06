import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductos } from '../interfaces/info-productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  infoProductos: InfoProductos[] = [];
  cargado = true;

  constructor(private http: HttpClient) {
    this.cargarProsuctos();
  }

  private cargarProsuctos() {
    console.log('Servicio de informacion de productos listo');
    this.http.get('https://angular-html-3cc97.firebaseio.com/productos_idx.json').subscribe((resp: InfoProductos[]) => {
        this.infoProductos = resp;
        setTimeout(() => {
          this.cargado = false;
        }, 2000);
    });
  }
}
