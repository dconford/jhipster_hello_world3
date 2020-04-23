import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INeighborhoodData, NeighborhoodData } from 'app/shared/model/neighborhood-data.model';
import { NeighborhoodDataService } from './neighborhood-data.service';

@Component({
  selector: 'jhi-neighborhood-data-update',
  templateUrl: './neighborhood-data-update.component.html'
})
export class NeighborhoodDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    neighborhoodName: []
  });

  constructor(
    protected neighborhoodDataService: NeighborhoodDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ neighborhoodData }) => {
      this.updateForm(neighborhoodData);
    });
  }

  updateForm(neighborhoodData: INeighborhoodData): void {
    this.editForm.patchValue({
      id: neighborhoodData.id,
      neighborhoodName: neighborhoodData.neighborhoodName
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const neighborhoodData = this.createFromForm();
    if (neighborhoodData.id !== undefined) {
      this.subscribeToSaveResponse(this.neighborhoodDataService.update(neighborhoodData));
    } else {
      this.subscribeToSaveResponse(this.neighborhoodDataService.create(neighborhoodData));
    }
  }

  private createFromForm(): INeighborhoodData {
    return {
      ...new NeighborhoodData(),
      id: this.editForm.get(['id'])!.value,
      neighborhoodName: this.editForm.get(['neighborhoodName'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INeighborhoodData>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
