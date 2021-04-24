import moment from 'moment'


export function format(date,format,local)
{ 
   let mymomo= moment(date)
    return  mymomo.format(format)
}