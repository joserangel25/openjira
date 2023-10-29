# NextJS OpenJira App
Para correr localmente, se necesita la Base de Datos

```
docker-compose up -d
```
* El -d significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* MOngoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

* Reconstruir los módulos de Node y levantar el proeyecto

```
yarn install
yarn dev
```

## Llenar la base de datos con la información de pruebas (o agregar la propia a través del front end)
Para eso llamar el siguiente endpoint
```
http://localhost:3000/api/seed
```