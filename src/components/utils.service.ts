import { Editor } from './editor';

export class UtilsService {
    protected editor: Editor

    constructor (
        editor: Editor
    ) {
        this.editor = editor

        const el = document.createElement('div')
        const html = this.convertFromRawToProcessedData().reduce((acc, item) => {
            return acc += item.visual
        }, '')
        el.innerHTML = html
        document.body.appendChild(el)
    }

    convertFromProcessedToRawData() {

    }

    convertFromRawToProcessedData() {
        const rawDataMock = "class\u0020DataStorage\u0020{\n\n\tprotected\u0020rawData\u0020=\u0020[]\n\tprotected\u0020processedData\u0020=\u0020[]\n\n\tbeautify()\u0020{}\n\n}"
        const storage: any[] = []

        for (let char of rawDataMock) {
            storage.push({
                logical: char,
                visual: this.typografy(char)
            })
        }

        return storage
    }

    typografy(char: string) {
        switch (char) {
            case '\u0020': return ' '
            case '\n': return '<br>'
            case '\t': return '&nbsp;&nbsp;&nbsp;&nbsp;'
            default: return char
        }
    }

    simbols/*:{[key: string]: (isUnicode?: boolean) => void}*/ = {

        getSpace (isUnicode: boolean = false) {
            const value = isUnicode?'\u0020':' '
        },

        getNBSpace (isUnicode: boolean = false) {
            const value = isUnicode?'\u00A0':'&nbsp;'
        },

        getNewLine (isUnicode: boolean = false) {
            const value = isUnicode?'\n':'<br>'
        },

        getTab (isUnicode: boolean = false) {
            const value = isUnicode?'\t':'&nbsp;&nbsp;&nbsp;&nbsp;'
        },
    }
}