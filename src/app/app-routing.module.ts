import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JugadoresComponent } from "./jugadores/jugadores.component";
import { JugadorComponent } from "./jugador/jugador.component";
import { GolesPorPartidoComponent } from "./goles-por-partido/goles-por-partido.component";
import { DebutComponent } from "./debut/debut.component";

const routes: Routes = [
  { path: "jugadores", component: JugadoresComponent },
  { path: "detail/:id", component: JugadorComponent },
  { path: "golesPorPartido", component: GolesPorPartidoComponent },
  { path: "debut", component: DebutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
