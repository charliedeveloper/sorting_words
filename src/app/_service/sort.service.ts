import { Injectable } from '@angular/core';
import { AppConstants } from "../_infra/AppConstants";

@Injectable({
  providedIn: 'root'
})
export class SortService {
  maximumColumn = AppConstants.maxColumnSize;
  numberOfRows: number;

   constructor() { }

   getSortedData(dataToSort: string): string[] {
      const cleanupInput = dataToSort.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
      return this.injectSpacerInForBiddenBoxes(this.sortMessage(cleanupInput));
   }

   /* Sort the message being sent from the client */
   private sortMessage(cleanInput: string): string[] {
      const splittedMesage = cleanInput.toUpperCase().split(' ');
      const sortedData = splittedMesage.sort((a, b) => {
        return (a < b) ? -1 : 1;
      });

      return sortedData;
   }

    /* Insert empty space on element/s that doesn't have a word*/
   private injectSpacerInForBiddenBoxes(sortedData: string[]) {
      const wordsCount = sortedData.length;
      this.numberOfRows = this.getNumberOfRowsToGenerate(wordsCount);
      const numberOfCels = this.maximumColumn * this.numberOfRows;
      const startingIndex = (numberOfCels - 1) - (this.numberOfRows * ((numberOfCels - 1) - wordsCount));
      for (let index = startingIndex; index < (numberOfCels); index += this.numberOfRows) {
        sortedData.splice(index, 0, '');
      }

      return sortedData;
    }

    private getNumberOfRowsToGenerate(wordsCount: number): number {
      this.numberOfRows = (+this.getTheWholeNumberPart((wordsCount / this.maximumColumn).toString())) + +((wordsCount % this.maximumColumn) > 0 ? 1 : 0);
      return this.numberOfRows;
    }

    private getNumberOfCelsToRender(): number {
      return this.maximumColumn * this.numberOfRows;
    }

    private getTheWholeNumberPart(floatingNum: string): number {
      const splitNumber = floatingNum.split('.');
      return parseInt(splitNumber[0], 10);
    }

}
