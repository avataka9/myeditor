type IAllRows = IRow[]

interface IRow {
    width: number
    height: number
    symbols: []
}

class DataStorage {

    protected rawData = []
    protected processedData = []

    beautify() {}

}