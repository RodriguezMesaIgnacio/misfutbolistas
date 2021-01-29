import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Jugador } from "./jugador";

@Injectable({
  providedIn: "root"
})
export class JugadorService {
  private url = "https://5fe06b1004f0780017de8b52.mockapi.io/jugadores";

  constructor(private http: HttpClient) {}

  getJugadoresApi() {
    return this.http.get(this.url);
  }

  updateJugador(doc: any) {
    const urlId = `${this.url}/${doc.id}`;
    return this.http.put(urlId, doc);
  }

  deleteJugador(jugador: Jugador) {
    const urlId = `${this.url}/${jugador.id}`;
    return this.http.delete(urlId);
  }

  addJugador(doc: any) {
    return this.http.post(this.url, doc);
  }

  getJugador(id: number) {
    const url = `${this.url}/${id}`;
    return this.http.get(url);
  }
}
