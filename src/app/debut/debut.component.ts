import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Jugador } from "../jugador";
import { JugadorService } from "../jugador.service";

@Component({
  selector: "app-debut",
  templateUrl: "./debut.component.html",
  styleUrls: ["./debut.component.css"]
})
export class DebutComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  jugadores: Array<Jugador> = [];
  jugadoresApi = null;
  jugadorTmp: any;

  chartOptions: Highcharts.Options = {
    chart: {
      type: "line",
      backgroundColor: "#ddbeb6",
      borderRadius: 15,
      spacing:[20,20,20,20]
    },
    title: {
      text: "Debuts por año",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },

    yAxis: {
      title: {
        text: "Debuts"
      }
    },

    xAxis: {
      categories: []
    },

    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },

    series: [
      {
        type: "line",
        name: "Año",
        color: "#512418",
        data: []
      }
    ]
  };

  constructor(private jugadorService: JugadorService) {}

  ngOnInit() {
    this.getMisDatos();
  }

  getMisDatos() {
    this.jugadorService.getJugadoresApi().subscribe(
      result => {
        const misDatos: Array<Jugador> = [];
        let api = null;
        api = result;
        for (let j of api) {
          let p = new Jugador(
            j.id,
            j.nombre,
            j.fechaDebut,
            j.partidos,
            j.goles,
            j.activo
          );
          misDatos.push(p);
        }

        type tDoc = {
          ano: string;
          debuts: number;
        };

        let debuts: Array<tDoc> = [];

        for (let j of misDatos) {
          let i = false;
          for (let t of debuts) {
            if (j.ano() == t.ano) {
              t.debuts++;
              i = true;
            }
          }
          if (!i) {
            let a: tDoc = {
              ano: j.ano(),
              debuts: 1
            };
            debuts.push(a);
          }
        }
        debuts.sort((a, b) => (a.ano > b.ano) ? 1 : -1)

        this.chartOptions.xAxis["categories"] = debuts.map((x: tDoc) => x.ano);

        this.chartOptions.series[0]["data"] = debuts.map((x: tDoc) => x.debuts);

        Highcharts.chart("miGrafico01", this.chartOptions);
      },
      error => console.log(error)
    );
  }
}
