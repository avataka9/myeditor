import { Editor } from './components/editor'

document.addEventListener('DOMContentLoaded',() => {
    const myeditor = <HTMLBaseElement> document.querySelector('.myeditor');
    if(!myeditor) return;

    const config = {
        element: myeditor
    }
    const editor = new Editor(config)
})
