export class Jugador {
  id: number;
  nombre: string;
  fechaDebut: Date;
  partidos: number;
  goles: number;
  activo: boolean;

  constructor(
    id: number,
    nombre: string,
    fechaDebut: Date,
    partidos: number,
    goles: number,
    activo: boolean
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fechaDebut = fechaDebut;
    this.partidos = partidos;
    this.goles = goles;
    this.activo = activo;
  }

  gpp() {
    let res: number = this.goles / this.partidos;
    return trunc(res, 2);
  }

  ano() {
    let a = new Date(this.fechaDebut);
    let res = a.getFullYear().toString();
    return res;
  }
}

function trunc(x, posiciones = 0) {
  var s = x.toString();
  var decimalLength = s.indexOf(".") + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}
