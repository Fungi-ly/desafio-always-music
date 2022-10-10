const { Client } = require('pg');

const config = {
    user: 'postgresql',
    host: 'localhost',
    password: 'postgresql',
    database: 'alwaysmusic',
    port: 5432,
}

const propiedad = process.argv.slice(2);

let ejecutar = propiedad[0];
let nombre = propiedad[1];
let rut = propiedad[2];
let curso = propiedad[3];
let nivel = propiedad[4];


const client = new Client(config);

const ingresar = async (nombre, rut, curso, nivel) => {
    const ingresar = `INSERT INTO alumno (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', ${nivel}) RETURNING *;`;
    const res = await client.query(ingresar);
    console.log('Registro de alumno agregado!', res.rows[0]);
    console.log('Cantidad de registros afectados:', res.rowCount);
}


const seleccionar = async (rut) => {
    const res = await client.query(`SELECT * FROM alumno WHERE rut='${rut}'`);
    console.log('Información de alumno: ', res.rows);
}

const editar = async (nombre, rut, curso, nivel) => {
    const update = `UPDATE alumno SET NOMBRE = '${nombre}', CURSO = '${curso}', NIVEL = ${nivel} WHERE '${rut}' RETURNING *;`;
    const res = await client.query(update);
    console.log('Registro de alumno modificado', res.rows[0]);
    console.log('Cantidad de registros afectados', res.rowCount);
}

const consulta = async () => {
    const res = await client.query('SELECT * FROM alumno');
    console.log('Registros totales: ', res.rows);
}


const eliminar = async (rut) => {
    const eliminar = `DELETE FROM alumno WHERE rut = '${rut}'`;
    const res = await client.query(eliminar);
    console.log('Cantidad de registros afectados', res.rowCount);
}


const proceso = async (ejecutar, nombre, rut, curso, nivel) => {
    client.connect();
    switch (ejecutar) {
        case "ingresar":
            await ingresar(nombre, rut, curso, nivel);
            break;
        case "elegir":
            await seleccionar(nombre)
            break;
        case "editar":
            await editar(nombre, rut, curso, nivel);
            break;
        case "consulta":
            await consulta()
            break;
        case "borrar":
            await eliminar(nombre)
            break;
        default:
            console.log('ERROR! Debe usar alguno de estos comandos: ingresar, elegir, editar, consulta o eliminar.')
    }
    client.end();
}
proceso(ejecutar, nombre, rut, curso, nivel);