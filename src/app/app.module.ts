import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";

import { AppComponent } from "./app.component";
import { JugadorService } from "./jugador.service";
import { JugadoresComponent } from "./jugadores/jugadores.component";
import { AppRoutingModule } from "./app-routing.module";
import { JugadorComponent } from "./jugador/jugador.component";
import { GolesPorPartidoComponent } from "./goles-por-partido/goles-por-partido.component";
import { DebutComponent } from './debut/debut.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    JugadoresComponent,
    JugadorComponent,
    GolesPorPartidoComponent,
    DebutComponent
  ],
  bootstrap: [AppComponent],
  providers: [JugadorService]
})
export class AppModule {}
