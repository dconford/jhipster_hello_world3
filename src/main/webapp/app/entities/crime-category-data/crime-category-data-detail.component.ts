import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICrimeCategoryData } from 'app/shared/model/crime-category-data.model';

@Component({
  selector: 'jhi-crime-category-data-detail',
  templateUrl: './crime-category-data-detail.component.html'
})
export class CrimeCategoryDataDetailComponent implements OnInit {
  crimeCategoryData: ICrimeCategoryData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crimeCategoryData }) => (this.crimeCategoryData = crimeCategoryData));
  }

  previousState(): void {
    window.history.back();
  }
}
