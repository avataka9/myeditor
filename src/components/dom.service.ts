import { Editor } from './editor'
import { ICharSize } from './../models'


export class DomService {
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
        this.editorContainer.addEventListener('click', this.onClick.bind(this))
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

    protected onClick(event: MouseEvent) {
        let x = 0
        let i = 0
        let docX = event.pageX /*- this.editorContainer.offsetLeft - parseInt(getComputedStyle(this.editorContainer).borderLeftWidth)*/
        let docY = /*event.pageY - */this.editorContainer.offsetTop + parseInt(getComputedStyle(this.editorContainer).borderTopWidth)
        let width = this.row.reduce((acc,cur) => acc + cur.width, 0)
        if (docX >= width) x = width + this.editorContainer.offsetLeft
        //if (!this.row.length || !docX && x !== width) return
        while (docX >= x && i < this.row.length && x < width) {
            x += this.row[i].width
            i++
        }
        this.editor.caret.caretMove( x, docY )
    }
}