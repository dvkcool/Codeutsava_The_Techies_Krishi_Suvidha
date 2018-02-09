# Krishi Suvidha
This is a basic application based on Hasura APIs and react-native for the basic front end needs built for usability of National Federation of Farmers' Procurement, Processing and Retailing Cooperatives of India Ltd (NACOF)

## Pre-requisites

* [NodeJS](https://nodejs.org)

* [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)

* [React-native](https://facebook.github.io/react-native/)

* [yarn packager](https://yarnpkg.com/lang/en/docs/install/)

## Deployment instruction

### Getting the Hasura project
Just run the following commands to get the project running perfectly.

```sh
# Cloning the project
$ hasura quickstart dvk/krishi-suvidha --type free
$ git add .
$ git commit -m "Deployment commit"
$ git  push hasura master
```
Now run the following command to get the cluster name
`$ hasura cluster list`
Sample output:
```sh
$ hasura cluster list
You have created 2 of 2 free clusters.
  # delete clusters that are not required using:
  $ hasura cluster delete [cluster-name]

Clusters available in your account:
NO   NAME        OWNER
1    advance88   you
2    conjoin72   you

Clusters added to this project:
NO   NAME        ALIAS
1    conjoin72   hasura
```
Here the cluster added to the project is conjoin72.

### Getting the app running
To get the app running, modify the cluster name in `cluster.json` file in `native-app` folder
After modification, it should like:
```sh
{
  "name":"conjoin72"
}
```
where conjoin72 should be replaced by your cluster name

Now run following commands to compile the native code for mobile
```sh
# changing to native-app folder
$ cd native-app
# Adding dependencies
$ yarn install
# Loading packager
$ yarn start
# Now depending on your choice ios or android choose a for android, or i for icons
$ a
```
Congratulations you got the app running.

## Hasura APIs used
1. Auth API
   We used the Auth API for the login/signup part.
   ![login](https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha/blob/master/demo/login.png)

2. The Data API
   For storing various data and retrieving it, we have used the Data APIs
   This quickstart app comes with seven pre-created tables `author`, `article` (Hasura defaults) and `equipments`, `tools`, `fertilizers`, `weather` and  `calculator`

    **equipments**

    column | type
    --- | ---
    id | Integer(auto increment)- primary key  
    name | Text
    seller | Text
    price  | Integer
    imageid  | Text

    Here the imageid stores the file id for the Filestore API
    We have similar structure for `tools` and `fertilizers`

    **weather**

    column | type
    --- | ---
    ms | Integer - primary key  
    me | Integer
    cropna | Text

    Here ms: month starting
    me: month ending
    cropna: crop name

    **calculator**

    column | type
    --- | ---
    cropna | Text - primary key  
    spa | Integer  
    plants | Text
    prod | Text

    Here cropna: crop name
    spa: seed production per acre
    plants: plants per acre
    prod: prduction per acre

 3. Filestore API
  The images of equipments, tools and fertilizers are stored using the filestore API and are retrieved using a get request with File id:
  ```sh
  # A snippet from Toolscr
  <Image source = {{ uri: "https://filestore."+cluster.name+".hasura-app.io/v1/file/"+rowData.image }}
    style={{height: 220, width: (Dimensions.get('window').width-50), flex: 0}}/>

  ```
## Generating the APK file for android.
For generating the apk files please refer to this [page](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html)

## Testing variables
This app comes with following user credentials:
```sh
username: dvk
password: 12345678
```
Also you could signup to create your own credentials.
The source code of front end is present in the native-app folder.


## The problems it is solved:

1. Weather forecasting using Forecast api.
______________________
![demo1](https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha/blob/master/demo/sc1.png)
_______________

2. Using Market sale.
___________________
![demo2](https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha/blob/master/demo/sc2.png)
_______________

3. Using Seed count calculator.
_________________
![demo3](https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha/blob/master/demo/sc3.png)
_______________
4. Predicting the right crop according to weather based on month.
_________________
![demo4](https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha/blob/master/demo/sc4.png)
_______________

### Modifying the app
Head over to `native-app` folder and start editing the react-native code

### Issues
If you find any issues/bugs feels free to report an issue [here]((https://github.com/dvkcool/Codeutsava_The_Techies_Krishi_Suvidha)

Happy Developing :)
Divyanshu Kumar
