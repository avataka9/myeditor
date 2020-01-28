/*
interface IEditor {
    destroy(): void;
}

interface IKeyService {
    next(key: string): void;
}

interface ICaretService {
    moveTo(): void;
}

interface ISelectService {
    select(): void;
}

interface IInfoStorage {

}*/


interface IEditorConfig {
    element: HTMLBaseElement
}

interface ICharSize {
    width: number
    height: number
}

export class Editor {
    public domService: DomService
    public keyService: KeyService
    public mouseService: MouseService
    public caret: Caret

    constructor (
        config:IEditorConfig
    ) {
        this.keyService = new KeyService(this)
        this.domService = new DomService(config.element, this)
        this.mouseService = new MouseService(this)
        this.caret = new Caret(this)
    }
}

class DomService {
    protected editorContainer: HTMLBaseElement
    protected editor: Editor

    public row: any[] = []

    constructor (
        editorContainer: HTMLBaseElement,
        editor: Editor
    ) {
        this.editorContainer = editorContainer
        this.editor = editor
        this.prepareEditor()
    }

    public write(key: {[key:string]:any}) {
        this.row.push(key)
        this.editorContainer.innerHTML = this.row.reduce((acc, cur) => acc + cur.value, '')
    }

    public getSizeOfNewChar(key: string): ICharSize {
        const element = document.createElement('div')
        element.style.display = 'inline'
        element.style.position = 'fixed'
        element.style.top = '-100vh'
        element.style.left = '-100vw'
        element.textContent = key
        document.body.appendChild(element);
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        element.remove()
        return {
            width,
            height
        }
    }

    public append( element: HTMLBaseElement | HTMLDivElement ) {
        //this.editorContainer.appendChild(element)
        document.body.appendChild(element)
    }

    protected prepareEditor():void {
        this.editorContainer.tabIndex = 0
        this.editorContainer.addEventListener('focus', this.onFocus.bind(this))
        this.editorContainer.addEventListener('blur', this.onBlur.bind(this))
        this.editorContainer.addEventListener('click', this.onLeftClick.bind(this))
        document.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    protected onFocus() {
        if (!this.editorContainer.classList.contains('focused')) {
            this.editorContainer.classList.add('focused')
        }
    }

    protected onBlur() {
        if (this.editorContainer.classList.contains('focused')) {
            this.editorContainer.classList.remove('focused')
        }
    }

    protected onKeyDown(event: KeyboardEventInit) {
        if (!this.editorContainer.classList.contains('focused')) return
        if (!event.key) return
        this.editor.keyService.nextKey(event.key)
    }

    protected onLeftClick(event: MouseEventInit) {
        let x = 0
        let i = 0
        let width = this.row.reduce((acc,cur) => acc + cur.width, 0)
        if (!this.row.length || !event.clientX) return
        if (event.clientX >= width) x = width
        while (event.clientX < width && i < this.row.length) {
            x += this.row[i].width
            i++
        }
        this.editor.caret.caretMove( x, 0 )
    }
}

class MouseService {
    protected editor: Editor
    
    constructor (
        editor: Editor
    ) {
        this.editor = editor
    }

    public click(x: number, y: number) {

    }
}

class KeyService {
    protected editor: Editor
    protected storage: {[key: string]: any} = {}

    constructor (
        editor: Editor
    ) {
        this.editor = editor
    }

    public nextKey(key: string) {
        if (!this.storage[key]) {
            const sizes = this.editor.domService.getSizeOfNewChar(key)
            this.storage[key] = {
                value: key,
                ...sizes,
            }
            console.log('new')
            console.log(this.storage[key])
        }
        this.editor.domService.write(this.storage[key])
    }
}

class Caret {
    protected editor: Editor
    protected caret: HTMLDivElement

    constructor (editor: Editor) {
        this.editor = editor;
        this.caret = document.createElement('div')
        this.caret.classList.add('caret')
        this.caret.style.opacity = '0'
        this.editor.domService.append(this.caret)
    }

    public caretMove( x: number, y: number) {
        this.caret.style.opacity = ''
        this.caret.style.top = y + 'px'
        this.caret.style.left = x + 'px'
    }
}