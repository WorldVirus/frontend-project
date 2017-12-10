import Block from './baseview';

import RegistrationValidate from '../blocks/autheficate/registrationAuth';
import LoginValidate from '../blocks/autheficate/loginAuth';

import Router from "../modules/router";


import UserService from '../servises/user-service';

const userService = new UserService();
const application = new Block(document.getElementById('application'));

const wrapper = new Block('div', ['wrapper']);
const game = new Block('div', ['game']);

const images = "logo";
const imageWall = "wall";


application.appendChildBlock('application', wrapper);
application.appendChildBlock("logo",
    new Block('img', [images]));
application.appendChildBlock("wall",
    new Block('img', [imageWall]));
const logo = document.querySelector('img.logo');
logo.setAttribute('src','../images/logo2.png');

const wall = document.querySelector('img.wall');
wall.setAttribute('src','../images/banner.png');

 function signin(login) {

    login.onSubmit((formdata) => {
        const authValidation = LoginValidate(formdata[0], formdata[1]);
        console.log(formdata[0], formdata[1]);
        if (authValidation === false) {
            return;
        }
        userService.signin(formdata[0], formdata[1])
            .then(() => new Router().go('/multiplayer'))
            .then(() => game.appendChildBlock('game', new Block('a', ['logout']).setText('logout')))
            .then(() => {
                let logout = document.querySelector('a.logout');
                logout.addEventListener('click', function () {
                    userService.logout()
                    new Router().go('/')
                })
            })
    });
}

 function signup(registration) {
     registration.onSubmit((formdata) => {
         const authValidation = RegistrationValidate(formdata[0], formdata[1], formdata[2], formdata[3]);
         if (authValidation === false) {
             return;
         }
         userService.signup(formdata[0], formdata[1], formdata[2])
             .then(() => new Router().go('/multiplayer'))
             .then(() => game.appendChildBlock('game', new Block('a', ['logout']).setText('logout')))
             .then(() => {
                 let logout = document.querySelector('a.logout');
                 logout.addEventListener('click', function () {
                     userService.logout()
                     new Router().go('/')
                 })
             })

     });
 }

export {signup,signin};


