import { Component, ViewChild, trigger, style, animate, transition } from '@angular/core';
import { NavController, NavParams, Searchbar } from 'ionic-angular';
import { group } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(0)', opacity: 0 }),
          animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateX(0)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class SearchFilterPage {
  @ViewChild('mainSearchbar') searchBar;
  grupos: Array<{ nombre: string, id: number, autos: Array<string> }> = [];
  filterGrupos: Array<{ nombre: string, id: number, autos: Array<string> }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const data = this.navParams.get('data');
    for (let index = 0; index < data.vectorIdGrupo.length; index++) {
      let grupo = {
        nombre: data.vectorNombreGrupo[index],
        id: data.vectorIdGrupo[index],
        autos: []
      }
      this.grupos.push(grupo);
    }
    this.grupos.push({ nombre: 'Sin Grupo', id: null, autos: [] });
    data.idGrupo.forEach((id, index) => {
      if (id) {
        this.grupos.find(x => x.id == id).autos.push(data.dominio[index]);
      } else {
        this.grupos.find(x => x.id == null).autos.push(data.dominio[index]);
      }
    });
    this.filterGrupos = this.grupos;
  }

  onInput(value: string): void {
    this.filterGrupos = JSON.parse(JSON.stringify(this.grupos));
    this.filterGrupos = this.filterGrupos.filter(g => {
      g.autos = g.autos.filter(a => a.toLowerCase().indexOf(value.toLowerCase()) === 0);
      return g.autos.length > 0;
    });
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 500);
  }
}
