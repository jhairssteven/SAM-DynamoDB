# Serverless Application Model (SAM) con DynamoDB y Docker


Este proyecto contiene código fuente y archivos de soporte para una aplicación que se implementa con SAM CLI y Docker. Incluye los siguientes archivos y carpetas.

|||
|-|-|
| [src/controller](./src/controller/)  | Contiene los controladores de la aplicación.                                                            |
| [src/database](./src/database)       | Contiene los modelos y configuraciones de la base de datos.                                             |
| [src/repository](./src/repository)   | Contiene las operaciones del ORM de los modelos.                                                        |
| [src/request](./src/request)         | Contiene ejemplos de los request de la aplicación.                                                      |
| [src/service](./src/service)         | Contiene servicios externos que se requieren para el funcionamiento de las funcionalidades principales. |
| [src/test](./src/test)               | Contiene los mockups y pruebas funcionales para la realización de pruebas funcionales.                  |
| [template.yaml](./template.yaml)     | Define los recursos de AWS de la aplicación.                                                            |





## Prerequisitos

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

* Node.js y npm - [Install Node.js ](https://nodejs.org/en/)

* Docker y Docker compose - [Install Docker](https://docs.docker.com/compose/install/)

## Configuración
En la carpeta `src`, cree un archivo `.env` con las siguientes variables de entorno. **Asegurese de asignarle los valores correspondientes**.

```javascript
NODE_ENV='' #development, test
SECRET='' #jwtsupersecret
```

Installe las dependencias con
```shell
src$ npm i
```

## Correr la aplicación
1. Actualize `NODE_ENV='development'`en el archivo `.env`
2. Corra el contenedor con DynamoDB en *detached mode*
    ```shell
    src/database$ docker compose up -d
    ```
3.  Corra la aplicación con

    ```shell
    SAM-DynamoDB$ sam local start-api --docker-network dynamodb_network
    ```
4. Puede enviar peticiones utilizando el formato de cada *enpoint* en la carpeta [request](./src/request/).

    > Nota: Para detener el contenedor de DynamoDB
    ```shell
    src/database$ docker compose down -v
    ```
## Pruebas unitarias
1. Corra el contenedor con DynamoDB en *detached mode*
    ```shell
    src/database$ docker compose up -d
    ```
2. Para correr las pruebas unitarias y los mockups actualize `NODE_ENV='test'`en el archivo `.env` y ejecute el comando

    ```shell
    src$ npm run test
    ```
