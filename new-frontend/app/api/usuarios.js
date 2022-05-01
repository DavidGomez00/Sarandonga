import cliente from './cliente';

const endpoint = '/cliente';

const anhadirCliente = (usuario) => {
    const data = {
        username: usuario.username,
        generosfav: usuario.generos,
        password: usuario.password,
        edad: usuario.edad,
        mujer: usuario.mujer
    }
    return cliente.post(endpoint, data);
}

const editarCliente = (usuario) => {
    const data = {
        username: usuario.username,
        generosfav: usuario.generos,
        password: usuario.password,
        edad: usuario.edad,
        mujer: usuario.mujer
    }
    return cliente.put(endpoint, data);
}

// Devuelve 1 cliente concreto. Este id se coge en el backend como req.params.id
const dameCliente = (id) => {
    return cliente.get(endpoint + `${id}`);
}