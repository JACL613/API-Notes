# API-Notes By **JACL_DEV**
## Para proyecto de Jóvenes Creativos

#### URL de Producción 
##### https://api-notes-production.up.railway.app/

> **Comandos para iniciar API**
> 1. __npm run start :__  <br/> Levanta la api en producción y en su respectiva base de datos
> 1. __npm run start:dev :__ <br/> Levanta la api en Desarrollo y en su respectiva base de datos
> 1. __npm run start:test :__ <br/> Levanta la api para Testing y en su respectiva base de datos

> __Variables de entorno esenciales :__ <br/>
> 1. SECRET: se usa para encriptar las contraseñas que se almacenaran en DB <br/>
> 1. DB_URI: Dirección para la colección a la DB <br/>
> 1. DB_URI_TEST: Dirección para la colección a la DB para testing <br/>


> **Rutas para peticiones de Usuario:** <br/>
> 1.POST api/users/create: Esta ruta crea un nuevo usuario, si no encuentra datos duplicados <br/> data { <br/> name, <br/>  nameuser, <br/>password <br/>} 
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697337566/capturas/ombthq5k0y1b5uog9vjv.png'/>

> 2.POST api/users/login: Esta ruta valida que el usuario este registrado y devuelve una cadena encriptada para uso de autorización  <br/> data { <br/> nameuser, <br/> password <br/>}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697337566/capturas/ipaa0vdtku7j6wnvueog.png'/>

> 3.GET api/users/oneUser: Esta ruta permite obtener los datos de un usuario el cual ya tiene autorización, la cual se envía en las cabecera de la petición http <br/> Headers { <br/> Authorization, <br/>}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697338336/capturas/w3jswdygqrlhapgtukh1.png' />


> **Rutas para peticiones de Notas:** <br/>
> 1.POST api/notes/create: Esta ruta podrás crear notas siempre y cuando tengas la autorización enviada en la cabecera de la petición http <br/>Headers { <br/> Authorization, <br/>}<br/> data { <br/> title, <br/>  content,<br/>}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697339135/capturas/zxtjfge8ttyamozqetnu.png' />

> 2.GET api/notes/: Esta ruta podrás obtener todas las notas del usuario <br/>Headers { <br/> Authorization, <br/>}<br/> data {}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697508635/capturas/pw9o3hqskzaukokz94mi.png' />

> 3.GET api/notes/one/: Esta ruta podrás obtener una nota del usuario del usuario <br/>Headers { <br/> Authorization, <br/>}<br/> data {}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697508635/capturas/pw9o3hqskzaukokz94mi.png' />

> 4.DELETE api/notes/: Esta ruta podrás borrar una nota del usuario del usuario <br/>Headers { <br/> Authorization, <br/> Id, <br/>}<br/> data {}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697508635/capturas/vpdzmbzou3x2v4ru1ucd.png' />

> 5.PUT api/notes/: Esta ruta podrás actualizar una nota del usuario del usuario <br/>Headers { <br/> Authorization, <br/> Id, <br/>}<br/> data {}
<img src='https://res.cloudinary.com/duxmumzjg/image/upload/v1697516371/capturas/cofh3iq5wsc5m6juon4p.png' />


