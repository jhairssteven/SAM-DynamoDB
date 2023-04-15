# Serverless Application Model (SAM) with DynamoDB and Docker


This project contains source code and supporting files for a basic REST API that is deployed with SAM CLI and Docker. It includes the following files and folders.

|||
|-|-|
| [src/controller](./src/controller/)  | Contains the application controllers.                                                            |
| [src/database](./src/database)       | Contains the database models and configurations.                                             |
| [src/repository](./src/repository)   | Contains the ORM operations of the models.                                                        |
| [src/request](./src/request)         | Contains examples of the application's requests.                                                      |
| [src/service](./src/service)         | Contains external services required for the operation of the main functionalities. |
| [src/test](./src/test)               | Contains mockups and unit tests for functional testing.                  |
| [template.yaml](./template.yaml)     | Defines the AWS resources of the application.                                                            |





## Prerequisites

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

* Node.js and npm - [Install Node.js ](https://nodejs.org/en/)

* Docker and Docker compose - [Install Docker](https://docs.docker.com/compose/install/)

## Configuration
In the `src` folder, create a `.env` file with the following environment variables. **Be sure to assign the corresponding values**.

```javascript
NODE_ENV='' #development, test
SECRET='' #jwtsupersecret
```

Install dependencies with
```shell
src$ npm i
```

## Running the application

1. Update NODE_ENV='development'in the .env file
2. Run the DynamoDB container in detached mode
    ```shell
    src/database$ docker compose up -d
    ```
3.  Run the application with

    ```shell
    SAM-DynamoDB$ sam local start-api --docker-network dynamodb_network
    ```
4. You can send requests using the format of each endpoint in the [request](./src/request/) folder.

    > Note: To stop the DynamoDB container
    ```shell
    src/database$ docker compose down -v
    ```
## Unit testing
1. Run the DynamoDB container in detached mode
    ```shell
    src/database$ docker compose up -d
    ```
2. To run unit tests and mockups, update `NODE_ENV='test'` in the `.env` file and execute the command

    ```shell
    src$ npm run test
    ```