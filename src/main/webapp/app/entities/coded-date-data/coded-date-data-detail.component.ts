import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICodedDateData } from 'app/shared/model/coded-date-data.model';

@Component({
  selector: 'jhi-coded-date-data-detail',
  templateUrl: './coded-date-data-detail.component.html'
})
export class CodedDateDataDetailComponent implements OnInit {
  codedDateData: ICodedDateData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codedDateData }) => (this.codedDateData = codedDateData));
  }

  previousState(): void {
    window.history.back();
  }
}
