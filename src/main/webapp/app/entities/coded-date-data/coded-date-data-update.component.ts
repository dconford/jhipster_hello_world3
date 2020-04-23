import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICodedDateData, CodedDateData } from 'app/shared/model/coded-date-data.model';
import { CodedDateDataService } from './coded-date-data.service';

@Component({
  selector: 'jhi-coded-date-data-update',
  templateUrl: './coded-date-data-update.component.html'
})
export class CodedDateDataUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codedDateString: []
  });

  constructor(protected codedDateDataService: CodedDateDataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ codedDateData }) => {
      this.updateForm(codedDateData);
    });
  }

  updateForm(codedDateData: ICodedDateData): void {
    this.editForm.patchValue({
      id: codedDateData.id,
      codedDateString: codedDateData.codedDateString
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const codedDateData = this.createFromForm();
    if (codedDateData.id !== undefined) {
      this.subscribeToSaveResponse(this.codedDateDataService.update(codedDateData));
    } else {
      this.subscribeToSaveResponse(this.codedDateDataService.create(codedDateData));
    }
  }

  private createFromForm(): ICodedDateData {
    return {
      ...new CodedDateData(),
      id: this.editForm.get(['id'])!.value,
      codedDateString: this.editForm.get(['codedDateString'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICodedDateData>>): void {
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
