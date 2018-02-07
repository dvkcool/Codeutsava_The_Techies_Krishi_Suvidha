# Krishi Suvidha
This is a basic application based on Hasura APIs and react-native for the basic front end needs built for usability of National Federation of Farmers' Procurement, Processing and Retailing Cooperatives of India Ltd (NACOF)


## Front end source code
The source code of front end is present [here](https://github.com/dvkcool/Codeutsava_frontend_react)


## The problems it is solved:

1. Weather forecasting using Forecast api.
______________________
![demo1](https://github.com/dvkcool/Codeutsava_frontend_react/demo/sc1.png)
_______________

2. Using Market sale using stripe.
___________________
![demo2](https://github.com/dvkcool/Codeutsava_frontend_react/demo/sc2.png)
_______________

3. Using Seed count calculator.
_________________
![demo3](https://github.com/dvkcool/Codeutsava_frontend_react/demo/sc3.png)
_______________



## What does this come with?

* Express.js Hello World
* Deployed with node server
* **Dockerfile** (automatically used by Hasura for deployment)

```
FROM mhart/alpine-node:7.6.0

WORKDIR /src

ADD src/package.json /src/
#install node modules
RUN npm install

# Add app source files
ADD src /src

CMD ["node", "server.js"]
```
* A react-native app which helps solve problems of farmers.


## Deployment instructions

### Basic deployment:

* Run following command to clone this repository
```sh
$ git clone https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha.git

# Deleting the contents of cluster.yaml

# Then adda cluster

$ hasura cluster create --type free

# Follow on screen instructions to add the cluster

```

### Making changes and deploying

* To make changes to the project, browse to `/microservices/api/src` and edit the `server.js` file in according to your app.
* Commit the changes, and perform `git push hasura master` to deploy the changes.


### Hasura API console

Every Hasura cluster comes with an api console that gives you a GUI to test out the BaaS features of Hasura. To open the api console

```sh
$ hasura api-console
```

This api console can be used to add data and files


### Add data APIs

Hasura comes with set of Data APIs to access the Postgres database which comes bundled with every Hasura cluster.
Detailed docs of data APIs can be found [here](https://docs.hasura.io/0.15/manual/data/index.html).

This cluster had following tables:
1. tools
2. equipments
3. fertilizers
4. calculator
5. crops


### Filestore APIs
This app uses the filestore APIs to fetch the images of tools, equipments, fetilizers using a basic get request.


