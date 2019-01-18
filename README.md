# e-sante
 
 Regardez la [vidéo](https://drive.google.com/file/d/1WvZFkxHnMCOX22r3o8ENpv2GjsOVGWdT/view?usp=sharing) de démonstration de la solution proposée.

Matériels nécessaires : 
- 
 - Une raspberry Pi 3 
 - Capteur de température
 - Capteur de respiration 
 - Capteur de position 

Technologies utilisées : 
- 
- Base de données MySQL 
- Front-end en AngularJS
- Utilisation de node.js

Installation : 
- 
 - Brancher la raspberry pi 3 et ses capteurs 
 - Se connecter en ssh à la raspberry pi 3 
 - Se placer dans le dossier DEV/
 - compiler le ficher c++ : ./compile.sh temperature.cpp
 - activer le capteur : sudo ./temperature
 
# API rest to MySQL

Open SSH connection with the Raspbery Pi 3.

Go on repertory '.\DEV\frontEnd\nodejs-restapi', and run `node .\server.js`

# SysEmbarque

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

All of the shell commands below must be done in sysEmbarque repertory ( `cd .\sysEmbarque` ).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 

