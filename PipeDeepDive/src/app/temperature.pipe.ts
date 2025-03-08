import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(value: string | number,
        inputType: 'cel' | 'fah',
        outType?: 'cel' | 'fah') {
        let val: number;

        if (typeof value === 'string') {
            val = parseFloat(value)
        }
        else {
            val = value
        }

        let outputTemp: number
        if (inputType === 'cel' && outType === 'fah') {
            outputTemp = val * (9 / 5) + 32
        } else if (inputType === 'fah' && outType === 'cel') {
            outputTemp = (val - 32) * (5 / 9)
        } else{
            outputTemp = val
        }

        let symbol: '°C' | '°F'
        
        if(!outType){
            symbol = inputType==='cel' ? '°C' : '°F'
        }
        else{
            
            symbol = outType==='cel' ? '°C' : '°F'
        }

        outputTemp = val * (9 / 5 + 32)
        return `${outputTemp} ${symbol}`
    }
}