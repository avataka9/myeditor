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

export class Editor {
    public domService: DomService
    public keyService: KeyService

    constructor (
        config:IEditorConfig
    ) {
        this.keyService = new KeyService(this)
        this.domService = new DomService(config.element, this)
    }
}

class DomService {
    protected editorContainer: HTMLBaseElement
    protected editor: Editor

    constructor (
        editorContainer: HTMLBaseElement,
        editor: Editor
    ) {
        this.editorContainer = editorContainer
        this.editor = editor
        this.prepareEditor()
    }

    public write(key: string) {
        this.editorContainer.innerHTML = this.editorContainer.innerHTML + key
    }

    public getSizeNewChar

    protected prepareEditor():void {
        this.editorContainer.tabIndex = 0
        this.editorContainer.addEventListener('focus', this.onFocus.bind(this))
        this.editorContainer.addEventListener('blur', this.onBlur.bind(this))
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
}

class KeyService {
    protected editor: Editor
    protected storage: any[] = []

    constructor (
        editor: Editor
    ) {
        this.editor = editor
    }


    public nextKey(key: string) {
        if (this.storage.indexOf(key) === -1) {
            this.storage.push(key)
            console.log('new')
        }
        this.editor.domService.write(key)
    }
}