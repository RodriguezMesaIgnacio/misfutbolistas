import { Component, OnInit } from "@angular/core";
import { Jugador } from "../jugador";
import { JugadorService } from "../jugador.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-jugador",
  templateUrl: "./jugador.component.html",
  styleUrls: ["./jugador.component.css"]
})
export class JugadorComponent implements OnInit {
  jugador: Jugador;

  constructor(
    private jugadorService: JugadorService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getJugador(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.jugadorService.getJugador(id).subscribe(jugador => {
      const jugadorTmp: any = jugador;
      this.jugador = jugadorTmp;
    });
  }

  save(
    fechaDebut: string,
    partidos: string,
    goles: string,
    activo: string
  ): void {
    let a = true;
    if (activo == "F") {
      a = false;
    } else if (activo == "V") {
      a = true;
    } else {
      return;
    }
    const partidosV = parseInt(partidos);
    const golesV = parseInt(goles);
    if (partidosV < 0 || golesV < 0) {
      return;
    }
    const doc = {
      id: this.jugador.id,
      nombre: this.jugador.nombre,
      fechaDebut: new Date(fechaDebut),
      partidos: partidosV,
      goles: golesV,
      activo: a
    };
    this.jugadorService.updateJugador(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getJugador();
  }
}
