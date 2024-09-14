const datos = require("./datos.json");

function puntoUno(estudiantes) {
  // CODIGO DE PUNTO 1 AQUI
  //Implemente una función que reciba los datos de estudiantes y retorne los correos de los estudiantes que han estado involucrados en la extra curricular INNOVA.

let prim = estudiantes.filter(estudiante => estudiante.info_extra_curriculares.length > 0);

let seg = prim.filter(estudiante => 
  estudiante.info_extra_curriculares.some(actividad => actividad.nombre === "INNOVA"));
return seg.map(estudiante => estudiante.info_personal.correo);
}
console.log(puntoUno(datos).length);



// CODIGO DE PUNTO 2 AQUI
/* function puntoDos(estudiantes){
  const mejoresPorSemestre = estudiantes.reduce((acc, estudiante) => {
    const semestre = estudiante.info_matricula.semestre;
    if (!acc[semestre] || estudiante.promedio > acc[semestre].promedio) {
        acc[semestre] = estudiante;
    }
    return acc;
}, );

return Object.values(mejoresPorSemestre).map(est => `${est.nombreCompleto}`);
}
console.log(puntoDos(datos)); */

function puntoDos(estudiantes) {
  return Object.values(
      estudiantes.reduce((mejoresPorSemestre, estudiante) => {
          estudiante.info_matricula.map(curso => {
              const totalPeso = curso.notas.reduce((acc, nota) => acc + nota.peso, 0);
              const promedio = curso.notas.reduce((acc, nota) => acc + nota.nota * nota.peso, 0) / totalPeso;

              const mejorEstudiante = mejoresPorSemestre[curso.semestre];
              if (!mejorEstudiante || promedio > mejorEstudiante.promedio) {
                  mejoresPorSemestre[curso.semestre] = {
                      nombreCompleto: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
                      promedio: promedio
                  };
              }
          });
          return mejoresPorSemestre;
      }, {})
  ).map(est => est.nombreCompleto);
}
console.log(puntoDos(datos));





// CODIGO DE PUNTO 3 AQUI
function puntoTres(estudiantes) {
  return estudiantes
      .filter(estudiante => estudiante.info_matricula.semestre === 1)
      .map(estudiante => {
          const { nombre, apellido, genero, altura, edad, nacimiento, correo, usuario } = estudiante.info_personal;
          return {
              gender: genero,
              titulo: genero === 'M' ? 'Sr.' : 'Sra.',
              nombreCompleto: `${nombre} ${apellido}`,
              primerNombre: nombre,
              primerApellido: apellido,
              altura: altura,
              edad: edad,
              nacimiento: nacimiento,
              correo: correo,
              usuario: usuario
          };
      });
}


console.log(puntoTres(datos));
