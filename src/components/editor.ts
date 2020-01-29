import { DomService } from './dom.service'
import { KeyService } from './key.service'
import { Caret } from './caret'
import { IEditorConfig } from './../models'

export class Editor {
    public domService: DomService
    public keyService: KeyService
    public caret: Caret

    constructor (
        config:IEditorConfig
    ) {
        this.keyService = new KeyService(this)
        this.domService = new DomService(config.element, this)
        this.caret = new Caret(this)
    }
}
