import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Jugador } from "../jugador";
import { JugadorService } from "../jugador.service";

@Component({
  selector: "app-goles-por-partido",
  templateUrl: "./goles-por-partido.component.html",
  styleUrls: ["./goles-por-partido.component.css"]
})
export class GolesPorPartidoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  jugadores: Array<Jugador> = [];
  jugadoresApi = null;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "#ddbeb6",
      borderRadius: 15,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Goles por partido",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Goles por Partido"
      }
    },

    series: [
      {
        type: "column",
        name: "Jugador",
        data: [],
        color: "#512418"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private jugadorService: JugadorService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.jugadorService.getJugadoresApi().subscribe(
      result => {
        this.jugadoresApi = result;

        this.jugadores = this.jugadoresApi.map((x: any) => {
          return new Jugador(
            x.id,
            x.nombre,
            x.fechaDebut,
            x.partidos,
            x.goles,
            x.activo
          );
        });

        this.jugadores.sort((a, b) => (a.gpp() < b.gpp() ? 1 : -1));

        this.chartOptions.xAxis["categories"] = this.jugadores.map(
          (x: Jugador) => x.nombre
        );
        this.chartOptions.series[0]["data"] = this.jugadores.map((x: Jugador) =>
          x.gpp()
        );

        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}

