import { Editor } from './editor'

export class KeyService {
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