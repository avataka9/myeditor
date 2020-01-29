import { Editor } from './editor'

export class Caret {
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