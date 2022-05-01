import cliente from './cliente';

const endpoint = '/locals';

const getList = (genero) => {
    console.log(endpoint + '?genero=' + `${genero}`);
}

const anhadirLocal = (local) => {
    const data = {
        nombre: local.nombre,
        generos: local.generos,
        direccion: local.direccion
    }
    return cliente.post(endpoint, data);
}

export default {
    getList,
    anhadirLocal
}