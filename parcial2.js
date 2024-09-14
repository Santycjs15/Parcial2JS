const datos = require("./datos.json");

function puntoUno(estudiantes) {


let prim = estudiantes.filter(estudiante => estudiante.info_extra_curriculares.length > 0);

let seg = prim.filter(estudiante => 
  estudiante.info_extra_curriculares.some(actividad => actividad.nombre === "INNOVA"));
return seg.map(estudiante => estudiante.info_personal.correo);
}
console.log(puntoUno(datos).length);



// CODIGO DE PUNTO 2 AQUI

function puntoDos(estudiantes) {
  return Object.values(
      estudiantes.reduce((mejoresPorSemestre, estudiante) =>
          estudiante.info_matricula.reduce((mejoresPorCurso, curso) => {
              let promedio = curso.notas
                  .map(nota => nota.nota * nota.peso)
                  .reduce((acc, nota) => acc + nota, 0);

                  const semNuevo = mejoresPorCurso[curso.semestre] && mejoresPorCurso[curso.semestre].promedio > promedio
                  ? mejoresPorCurso[curso.semestre]
                  : {
                      nombreCompleto: `${estudiante.info_personal.nombre} ${estudiante.info_personal.apellido}`,
                      promedio: promedio
                    };
              return {
                  ...mejoresPorCurso,
                  [curso.semestre]: semNuevo
              };
          }, mejoresPorSemestre)
      , {})
  ).map(est => est.nombreCompleto);
}








// CODIGO DE PUNTO 3 AQUI
function puntoTres(estudiantes) {
  return estudiantes
  .filter((estudiante) => estudiante.info_matricula.every((curso) => curso.semestre === 1)
  )
    .map((estudiante) => {
      const { 
        gender, 
        nombre, 
        apellido, 
        altura, 
        nacimiento, 
        correo 
      } = estudiante.info_personal;

      return {
        gender: gender,
        titulo: gender === "M" ? "Sr." : "Sra.",
        nombreCompleto: `${nombre} ${apellido}`,
        primerNombre: nombre,
        primerApellido: apellido,
        altura: Math.round(altura * 100),
        edad: 2024 - nacimiento.split("-")[0],
        nacimiento: nacimiento,
        correo: correo,
        usuario: correo.split("@")[0],
      };
    });
}


