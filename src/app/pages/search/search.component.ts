import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  termino: string;

  constructor(private router: ActivatedRoute, public _ps: ProductosService) { }

  ngOnInit() {
    this.router.params.subscribe(parametros => {
      this.termino = parametros['txt'];
      this._ps.buscarItem(this.termino);
    });
  }

}
