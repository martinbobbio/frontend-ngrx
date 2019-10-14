import { Pipe, PipeTransform } from '@angular/core';
import { EgressIncome } from '../models/egress-income';

@Pipe({
  name: 'orderEgressIncome'
})
export class OrderEgressIncomePipe implements PipeTransform {

  transform(items: EgressIncome[]): EgressIncome[] {
    return items.sort((a) => {
      if(a.type === 'income') return -1
      else return 1
    })
  }

}
