import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INeighborhoodData } from 'app/shared/model/neighborhood-data.model';

@Component({
  selector: 'jhi-neighborhood-data-detail',
  templateUrl: './neighborhood-data-detail.component.html'
})
export class NeighborhoodDataDetailComponent implements OnInit {
  neighborhoodData: INeighborhoodData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ neighborhoodData }) => (this.neighborhoodData = neighborhoodData));
  }

  previousState(): void {
    window.history.back();
  }
}
