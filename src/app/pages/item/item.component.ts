import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { InfoItem } from '../../interfaces/info-item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: InfoItem;
  id: string;

  constructor(private router: ActivatedRoute, public _ps: ProductosService) { }

  ngOnInit() {
    this.router.params.subscribe(parametros => {
      this._ps.cargaItem(parametros['id']).subscribe((respuesta: InfoItem) => {
        this.item = respuesta;
        this.id = parametros['id'];
      } );
    });
  }

}
