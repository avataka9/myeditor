class KeyService {
    protected editor: HTMLElement;

    constructor (editor) {
        this.editor = editor;
    }

    protected storage: any[] = [];

    public nextKey(key: string|undefined) {
        if (this.storage.indexOf(key) === -1) {
            this.storage.push(key);
            console.log('new')
        }
        this.editor.innerHTML = this.editor.innerHTML + key;
    }
}

document.addEventListener('DOMContentLoaded',() => {
    const myeditor = document.querySelector('.myeditor');

    if(!myeditor) return;

    myeditor.addEventListener('focus',() => {
        if (!myeditor.classList.contains('focused')) {
            myeditor.classList.add('focused')
        }
    })

    myeditor.addEventListener('blur',() => {
        if (myeditor.classList.contains('focused')) {
            myeditor.classList.remove('focused')
        }
    })

    document.addEventListener('keydown', (event: KeyboardEventInit) => {
        if (!myeditor.classList.contains('focused')) return;
        keyService.nextKey(event.key)
    })

    const keyService = new KeyService(myeditor);
})
