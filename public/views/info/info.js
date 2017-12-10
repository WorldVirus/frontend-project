import Block from '../baseview';
import './info.scss';


const buttonBack = "buttonBack";
const authors = [
    {
        name: "Kirill",
        link:"https://github.com/KCherkasov"
    },
    {
        name: "Veniamin",
        link:"https://github.com/WorldVirus"
    },
    {
        name: "Vlad",
        link:"https://github.com/torrentino555"
    },
    {
        name: "Artur",
        link: "https://github.com/zonder129"
    }
];
class Info extends Block {
    constructor() {
        super('ul', ['info'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock('auth',new Block('h1',['authors_header']).setText('Creators'));
        authors.forEach((i) => {
            let value = new Block('li', ['authors']);
          this.appendChildBlock(i.name,
                value.setText(i.name))
            value.setAttribute("href",i.link);
        });
    }

    creation() {
        const wrappe = document.querySelector('div.wrapper');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0])
        }
        wrappe.appendChild(this._element);
    }

}
export default Info;

