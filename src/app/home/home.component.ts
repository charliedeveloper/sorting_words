import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SortService } from "../_service/Sort.Service";
import { AppConstants } from "../_infra/AppConstants";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  messageForm: FormGroup;
  flexHeight: number;
  sortedWords: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sortService: SortService
  ) {
    this.messageForm = this.formBuilder.group({
      message: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.flexHeight = 250;
  }

  get performSort() {
    if (!this.isValidEntry()) {
      return;
    }
    this.sortedWords = this.sortService.getSortedData(
      this.messageForm.controls.message.value
    );
    const numberOfRows = this.sortedWords.length / AppConstants.maxColumnSize;
    this.flexHeight = (numberOfRows + (numberOfRows > 1 ? 1 : 0)) * 100 + 50;
    return this.sortedWords;
  }

  isValidEntry(): boolean {
    let isValid = false;
    const cleanInput = this.messageForm.controls.message.value.replace(
      /^\s+|\s+$|\s+(?=\s)/g,
      ""
    );
    const regEx = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
    if (cleanInput.match(regEx)) {
      isValid = true;
    }

    return isValid;
  }
}
