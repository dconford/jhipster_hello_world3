import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICrimeCategoryData, CrimeCategoryData } from 'app/shared/model/crime-category-data.model';
import { CrimeCategoryDataService } from './crime-category-data.service';

@Component({
  selector: 'jhi-crime-category-data-update',
  templateUrl: './crime-category-data-update.component.html'
})
export class CrimeCategoryDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    crimeCategory: []
  });

  constructor(
    protected crimeCategoryDataService: CrimeCategoryDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ crimeCategoryData }) => {
      this.updateForm(crimeCategoryData);
    });
  }

  updateForm(crimeCategoryData: ICrimeCategoryData): void {
    this.editForm.patchValue({
      id: crimeCategoryData.id,
      crimeCategory: crimeCategoryData.crimeCategory
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const crimeCategoryData = this.createFromForm();
    if (crimeCategoryData.id !== undefined) {
      this.subscribeToSaveResponse(this.crimeCategoryDataService.update(crimeCategoryData));
    } else {
      this.subscribeToSaveResponse(this.crimeCategoryDataService.create(crimeCategoryData));
    }
  }

  private createFromForm(): ICrimeCategoryData {
    return {
      ...new CrimeCategoryData(),
      id: this.editForm.get(['id'])!.value,
      crimeCategory: this.editForm.get(['crimeCategory'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICrimeCategoryData>>): void {
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
