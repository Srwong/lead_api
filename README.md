# Lead API challenge

## Purpose

This an API that allows you to create users named "usuarios" and create leads for the users. There are three possible leads:

1. Auto
2. Casa
3. Nomina

mongo ATLAS
NODE 
DOCKER?

The solution has 4 main endpoints:

1. /usuarios
2. /autos
3. /casas
4. /nominas

## Usage

To use this api you have two options. Directly executing the code on your machine or use a docker container.

### Local machine execution

1. Clone the repository.
2. Get into the directory.
3. Open a terminal in the same directory as these files and run the following commands to install the libraries
  - `npm install express --save`
  - `npm install body-parser --save`
  - `npm install mongoose --save`
4. Start the server running `node srver.js`. It will be using port 5000.

### Docker container

1. Clone the repository.
2. Get into the directory.
3. Run the command `docker build -t IMAGE_NAME:TAG .`. This command will create the image using dockerfile within the repository. You can create your own image if desired. IMAGE_NAME is the name for the new image and TAG is used as a version, an example could be `lead_api/node:v1.0`
4. To run a container use command `docker run -d -p HOST_PORT:5000 IMAGE_NAME:TAG`. HOST_PORT will be the port you are willing to use on your server.

## Usuario endpoint

### /usuarios

This endpoint is to handle all the users. We only have two possible actions. Any other action will get an invalid response message. 

 - GET - Responses with a list of all the users in the database.
 - POST  - Add a new user to the database.

POST example
~~~
{
    "nombre":"Alex",
    "email":"alex@gmail.com",
    "telefono":"4444444444",
    "domicilio":"cdmx",
    "rfc":"cdmf123456xyz"
}
~~~
### /usuarios/{rfc}

This endpoint is to handle a single instance of usuarios. We only have three possible actions. Any other action will get an invalid response message. 

 - GET - Responses with the user containing that RFC.
 - PUT  - Updates the stored values for that user.
 - DELETE - Deletes the user with the RFC requested. 

PUT example
~~~
{
    "nombre":"Alex",
    "email":"alex@gmail.com",
    "telefono":"4444444444",
    "domicilio":"cdmx",
    "rfc":"cdmf123456xyz"
}
~~~

## Autos endpoint

### /autos

This endpoint is to handle all the auto leads. We only have two possible actions. Any other action will get an invalid response message. 

 - GET - Responses with a list of all the auto leads in the database.
 - POST  - Add a new auto lead to the database.

POST example
~~~
{
    "usuarioID":"6181a8644c7423a67db89f16",
    "autoLeadID":"2",
    "modelo":"mazda 3",
    "precio":300000
}
~~~
### /autos/{autoLeadID}

This endpoint is to handle a single instance of autos. We only have three possible actions. Any other action will get an invalid response message.

 - GET - Responses with the auto lead with that auto lead ID.
 - PUT  - Updates the stored lead values.
 - DELETE - Deletes the lead with the auto lead ID requested. 

PUT example
~~~
{
    "autoLeadID":"2",
    "modelo":"tesla",
    "precio":1000000
}
~~~

## Casas endpoint

### /casas

This endpoint is to handle all the casa leads. We only have two possible actions. Any other action will get an invalid response message. 

 - GET - Responses with a list of all the casa leads in the database.
 - POST  - Add a new casa lead to the database.

POST example
~~~
{
    "usuarioID":"6181a8954c7423a67db89f1b",
    "casaLeadID":"2",
    "domicilio":"tlaxcala, tlaxcala ",
    "valor":2000000
}
~~~
### /casas/{casaLeadID}

This endpoint is to handle a single instance of casa. We only have three possible actions. Any other action will get an invalid response message.

 - GET - Responses with the casa lead with that casa lead ID.
 - PUT  - Updates the stored lead values.
 - DELETE - Deletes the lead with the casa lead ID requested. 

PUT example
~~~
{
    "autoLeadID":"2",
    "modelo":"ciudad de México",
    "valor":2000000
}
~~~

## Nominas endpoint

### /nominas

This endpoint is to handle all the nomina leads. We only have two possible actions. Any other action will get an invalid response message. 

 - GET - Responses with a list of all the nomina leads in the database.
 - POST  - Add a new nomina lead to the database. The "ingreso" value should be provided as MM/DD/YY.

POST example
~~~
{
    "usuarioID":"6181a8954c7423a67db89f1b",
    "nominaLeadID":"2",
    "empresa":"empresa3",
    "ingreso":"12/31/19"
}
~~~
### /nominas/{nominaLeadID}

This endpoint is to handle a single instance of casa. We only have three possible actions. Any other action will get an invalid response message.

 - GET - Responses with the casa lead with that casa lead ID.
 - PUT  - Updates the stored lead values.
 - DELETE - Deletes the lead with the casa lead ID requested. 

PUT example
~~~
{
    "nominaLeadID":"2",
    "empresa":"P&G",
    "ingreso":01/01/20
}
~~~
-----------------------------------------
### Future improvement notes

1. Use RFC to match the leads to a user instead of mongo object ID.
2. When a user is deleted, delete first all the leads under his domain.
3. For the auto valuation, instead of sending the auto price, use another collection with registered models and prices.
4. For casa leads, address can be separated in granular fields to simply check a value instead of searching a perfect match on all the string.
5. Nomina lead could use separate fields for month, day and year. This to work with a more exact calculation of 14 months instead of 420 days using 30 days as a month.
6. PUT method was implemented as excersice and possible usage. At the moment it only updates values, but not the acecpted or rejected status. If it is possible and prefered to edit and change the status over generating a new lead, this could be modified. Otherwise, deleted and send an error message.
7. There is no login capability. Could be added to the root endpoint "/" as it only displays a message to use other endpoint.
