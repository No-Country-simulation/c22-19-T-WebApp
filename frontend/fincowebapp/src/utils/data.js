/*
 id integer [primary key]
  nombre varchar(200)
  apellido varchar(200)
  foto_perfil varchar
  sucursal_id integer
  role_id integer
  superior_id integer [null]
  created_at datetime 
  updated_at datetime 
*/
export const fakeUser = {
    id: 'id',
    nombre: 'Beatriz',
    apellido: 'Fernandéz',
    foto_perfil: 'fotoperfil.webb',
}