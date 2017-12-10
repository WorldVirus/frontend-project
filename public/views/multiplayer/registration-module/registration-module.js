'use strict'
import  Block from '../../baseview'
import './module.scss'
const enity = [
    {
    src:'../../../images/warrior.png'
},
    {
        src:'../../../images/priest.png'
    },{
        src:'../../../images/mage.png'
    },{
        src:'../../../images/thief.png'
    }
]
let index = 0;
const wrape = document.querySelector('div.wrapper');
export default class Choose extends Block{
    constructor() {
        super('div', ['choose'], {});
        this.createChildren();
        return this;
    }

        // const wrappe = document.querySelector('div.wrapper');
        // if (wrappe.childNodes[0] !== undefined) {
        //     wrappe.removeChild(wrappe.childNodes[0])
        // }
        // wrappe.appendChild(this._element);

createChildren () {
        this.appendChildBlock('img',new Block('img', ['person']));
}
choose () {
    this.appendChildBlock('choose',new Block ('a',['choose_left']))
    wrape.appendChild(this._element)

   this.appendChildBlock('choose',new Block ('a',['choose_right']))
    wrape.appendChild(this._element)

    document.querySelector('a.choose_right').addEventListener('click', () => {
        if (index !==3) {
                    console.log(index)
                    ++index;
                    document.querySelector('img.person').setAttribute('src', enity[index].src);
        }
    });

    document.querySelector('a.choose_left').addEventListener('click', () => {
        if (index !==0) {
            --index;
            document.querySelector('img.person').setAttribute('src', enity[index].src);
        }
    });
}

leftbar () {
    this.appendChildBlock('left_bar',new Block ('div',['left_bar']).setText('test'))
    wrape.appendChild(this._element)

    this.appendChildBlock('new_character',new Block ('a',['new_character']).setText('CREATE NEW'))
    wrape.appendChild(this._element)

    this.appendChildBlock('new_character',new Block ('a',['delete']).setText('DELETE'))
    wrape.appendChild(this._element)

}
footbarCreate() {
        this.appendChildBlock('footbar',new Block ('a',['enter']).setText('ENTER'))
    wrape.appendChild(this._element)
    this.appendChildBlock('footbar',new Block ('a',['back']).setText('BACK'))
    wrape.appendChild(this._element)
}
creation () {
    const image = document.querySelector('img.wall');
    if ( document.querySelector('div.main-menu') !== null)
    {
        console.log(image)
        document.querySelector('div.main-menu').remove();
    }
    image.remove();

    wrape.appendChild(this._element);
this.footbarCreate();
this.choose();
this.leftbar();
    let value = document.querySelector('img.person')
value.setAttribute('src',enity[0].src);

    // const navigator = document.querySelector('a.buttonBack');
    //     navigator.addEventListener('click', () => {
    //         new Router().go('/')
    //     });
    }
}