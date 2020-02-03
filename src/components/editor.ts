import { UtilsService } from './utils.service';
import { DomService } from './dom.service'
import { KeyService } from './key.service'
import { Caret } from './caret'
import { IEditorConfig } from './../models'

export class Editor {
    public domService: DomService
    public keyService: KeyService
    public utilsService: UtilsService
    public caret: Caret

    constructor (
        config:IEditorConfig
    ) {
        this.keyService = new KeyService(this)
        this.domService = new DomService(config.element, this)
        this.utilsService = new UtilsService(this)
        this.caret = new Caret(this)
    }
}
