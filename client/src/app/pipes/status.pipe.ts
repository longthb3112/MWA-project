import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: Number) {
    if(value == 0){
      return "Open";
    }
      return "Closed";   
  }
}