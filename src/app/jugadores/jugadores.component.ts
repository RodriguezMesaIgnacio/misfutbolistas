import { Component, OnInit } from "@angular/core";
import { Jugador } from "../jugador";
import { JugadorService } from "../jugador.service";

@Component({
  selector: "app-jugadores",
  templateUrl: "./jugadores.component.html",
  styleUrls: ["./jugadores.component.css"]
})
export class JugadoresComponent implements OnInit {
  jugadores: Array<Jugador> = [];
  jugadoresApi = null;
  jugadorTmp: any;

  constructor(private jugadorService: JugadorService) {}

  getJugadoresApi() {
    this.jugadorService.getJugadoresApi().subscribe(jugadores => {
      this.jugadoresApi = jugadores;
      for (let j of this.jugadoresApi) {
        let p = new Jugador(
          j.id,
          j.nombre,
          j.fechaDebut,
          j.partidos,
          j.goles,
          j.activo
        );
        this.jugadores.push(p);
      }
    });
  }

  add(
    nombreP: string,
    fechaDebutP: string,
    partidosP: string,
    golesP: string,
    activoP: string
  ) {
    const nombreV = nombreP.trim();
    const fechaDebutV = new Date(fechaDebutP);
    const partidosV = parseInt(partidosP);
    const golesV = parseInt(golesP);
    let activoV = true;

    if (activoP == "F") {
      activoV = false;
    } else if (activoP == "V") {
      activoV = true;
    } else {
      return;
    }

    if (!nombreV || partidosV < 0) {
      return;
    }

    const newDoc: any = {
      nombre: nombreV,
      fechaDebut: fechaDebutV,
      partidos: partidosV,
      goles: golesV,
      activo: activoV
    };

    this.jugadorService.addJugador(newDoc).subscribe(jugador => {
      this.jugadorTmp = newDoc;
      this.jugadores.push(this.jugadorTmp);
    });
  }

  delete(jugador: Jugador): void {
    this.jugadores = this.jugadores.filter(j => j !== jugador);
    this.jugadorService.deleteJugador(jugador).subscribe();
  }

  ngOnInit() {
    this.getJugadoresApi();
  }
}
