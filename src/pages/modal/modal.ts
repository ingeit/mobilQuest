import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  @Input() filtrosAlertas;
  switched:boolean = false;
  switchedMapa:boolean = false;
  hayAlertas: boolean = false;
  constructor(
    public viewCtrl: ViewController,
    public event: Events,
    public navCtrl: NavController,
    public HomeP: HomePage
  ) {

  }

  ngOnChanges() {
    if(this.filtrosAlertas){
      for(let alerta in this.filtrosAlertas.alertas){
        if(this.filtrosAlertas.alertas[alerta].length){
          return this.hayAlertas = true;
        }
      }
      this.hayAlertas = false;
    }
  }

  actualizar() {
    this.HomeP.consultarTodo(true);
  }

  verTodaLaFlota() {
    this.HomeP.consultarTodo();
  }

  filtro(arrayAutos){
    this.HomeP.filtroModal(arrayAutos);
  }

  switchValue(){
    this.switched = !this.switched;
  }

  switcherMapa(){
    this.switchedMapa = !this.switchedMapa;
    this.event.publish('mapType', this.switchedMapa)
  }
}
