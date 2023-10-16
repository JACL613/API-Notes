# API-Notes By **JACL_DEV**
### Para proyecto de Jóvenes Creativos

> **Comandos para iniciar API**
> 1. __npm run start :__  <br/> Levanta la api en producción y en su respectiva base de datos
> 1. __npm run start:dev :__ <br/> Levanta la api en Desarrollo y en su respectiva base de datos
> 1. __npm run start:test :__ <br/> Levanta la api para Testing y en su respectiva base de datos

> __Variables de entorno esenciales :__ <br/>
> 1. SECRET: se usa para encriptar las contraseñas que se almacenaran en DB <br/>
> 1. DB_URI: Dirección para la colección a la DB <br/>
> 1. DB_URI_TEST: Dirección para la colección a la DB para testing <br/>


> Rutas para peticiones de Usuario: <br/>
> 1. api/users/create: Esta ruta crea un nuevo usuario, si no encuentra datos duplicados <br/> data { <br/> name, <br/>  nameuser, <br/>password <br/>} ![imagen de muestra1!](./public/assets/img/Create.png)
>
> 2. api/users/login: Esta ruta valida que el usuario este registrado y devuelve una cadena encriptada para uso de autorización  <br/> data { <br/> nameuser, <br/> password <br/>}
>![imagen de muestra2!](./public/assets/img/login.png)  
>
> 3. api/users/oneUser: Esta ruta permite obtener los datos de un usuario el cual ya tiene autorización, la cual se envía en las cabecera de la petición http <br/> Headers { <br/> Authorization, <br/>}
>![imagen de muestra3!](./public/assets/img/user.png)  


> Rutas para peticiones de Notas: <br/>
> 1. api/notes/createNote: Esta ruta podrás crear notas siempre y cuando tengas la autorización enviada en la cabecera de la petición http <br/>Headers { <br/> Authorization, <br/>}<br/> data { <br/> title, <br/>  content,<br/>}
>![imagen de muestra3!](./public/assets/img/createNote.png)

