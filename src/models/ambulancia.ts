// class Ambulancia extends Vehicle {
//     equipoMedico: string[];
//     tieneSirena: boolean;
  
//     constructor(
//         id: string,
//         marca: string,
//         modelo: string,
//         año: number,
//         color: string,
//         kilometraje: number,
//         tipoCombustible: 'Gasolina' | 'Diesel' | 'Eléctrico' | 'Híbrido',
//         transmision: 'Manual' | 'Automática',
//         numeroDePuertas: number,
//         equipoMedico: string[],
//         tieneSirena: boolean
//     ) {
//       super(id, marca, modelo, año, color, kilometraje, tipoCombustible, transmision, numeroDePuertas);
//       this.equipoMedico = equipoMedico;
//       this.tieneSirena = tieneSirena;
//     }
  
//     descripcion(): string {
//       return `${super.descripcion()}, Equipo Médico: ${this.equipoMedico.join(', ')}, Tiene Sirena: ${this.tieneSirena}`;
//     }
// }


// --------------------------------------------------------------------------------------------------

//   const miAmbulancia = new Ambulancia(
//     'Mercedes-Benz',
//     'Sprinter',
//     2022,
//     'Blanco',
//     5000,
//     'Diesel',
//     'Automática',
//     4,
//     ['Desfibrilador', 'Oxígeno', 'Monitor cardíaco'],
//     true
//   );
  
//   // Imprimir la descripción de la ambulancia
//   console.log(miAmbulancia.descripcion());