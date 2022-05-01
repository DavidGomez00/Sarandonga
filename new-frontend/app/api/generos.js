import cliente from './cliente';

const endpoint = '/generos';

const getList = () => cliente.get(endpoint);

const anhadirGenero = (nombre) => cliente.post(endpoint, {nombre: nombre});
// Falta editar, eliminar ?
export default {
    getList,
    anhadirGenero
}