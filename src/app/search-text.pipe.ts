import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchTextPipe implements PipeTransform {

  transform(value: any, searchText): any {
    if (!searchText) {
      return value;
    }
    else {
      searchText = searchText.toLowerCase();
      return value.filter(response => response.title.toLowerCase().startsWith(searchText));
    }

  }

}
