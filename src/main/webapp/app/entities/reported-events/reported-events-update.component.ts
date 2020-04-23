import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReportedEvents, ReportedEvents } from 'app/shared/model/reported-events.model';
import { ReportedEventsService } from './reported-events.service';
import { ICrimeCategoryData } from 'app/shared/model/crime-category-data.model';
import { CrimeCategoryDataService } from 'app/entities/crime-category-data/crime-category-data.service';
import { INeighborhoodData } from 'app/shared/model/neighborhood-data.model';
import { NeighborhoodDataService } from 'app/entities/neighborhood-data/neighborhood-data.service';
import { ICodedDateData } from 'app/shared/model/coded-date-data.model';
import { CodedDateDataService } from 'app/entities/coded-date-data/coded-date-data.service';

type SelectableEntity = ICrimeCategoryData | INeighborhoodData | ICodedDateData;

@Component({
  selector: 'jhi-reported-events-update',
  templateUrl: './reported-events-update.component.html'
})
export class ReportedEventsUpdateComponent implements OnInit {
  isSaving = false;
  crimecategorydata: ICrimeCategoryData[] = [];
  neighborhooddata: INeighborhoodData[] = [];
  codeddatedata: ICodedDateData[] = [];
  newDateFieldDp: any;

  editForm = this.fb.group({
    id: [],
    complaintId: [],
    codedMonth: [],
    codedMonthAsInt: [],
    eventOccurred: [],
    newCrimeflag: [],
    crimeUnfoundedFlag: [],
    administrativeAdjustmentFlag: [],
    count: [],
    cleanupFlag: [],
    crimeCode: [],
    districtCode: [],
    eventDescription: [],
    ileadsAddressNumber: [],
    ileadsStreetName: [],
    neighborhoodCode: [],
    eventLocationName: [],
    eventLocationComment: [],
    cadStreetNumber: [],
    cadStreetName: [],
    xCoordinates: [],
    yCoordinates: [],
    crimeCategoryShortened: [],
    newDateField: [],
    crimeCategoryData: [],
    neighborhoodData: [],
    codedDateData: []
  });

  constructor(
    protected reportedEventsService: ReportedEventsService,
    protected crimeCategoryDataService: CrimeCategoryDataService,
    protected neighborhoodDataService: NeighborhoodDataService,
    protected codedDateDataService: CodedDateDataService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportedEvents }) => {
      this.updateForm(reportedEvents);

      this.crimeCategoryDataService
        .query()
        .subscribe((res: HttpResponse<ICrimeCategoryData[]>) => (this.crimecategorydata = res.body || []));

      this.neighborhoodDataService.query().subscribe((res: HttpResponse<INeighborhoodData[]>) => (this.neighborhooddata = res.body || []));

      this.codedDateDataService.query().subscribe((res: HttpResponse<ICodedDateData[]>) => (this.codeddatedata = res.body || []));
    });
  }

  updateForm(reportedEvents: IReportedEvents): void {
    this.editForm.patchValue({
      id: reportedEvents.id,
      complaintId: reportedEvents.complaintId,
      codedMonth: reportedEvents.codedMonth,
      codedMonthAsInt: reportedEvents.codedMonthAsInt,
      eventOccurred: reportedEvents.eventOccurred,
      newCrimeflag: reportedEvents.newCrimeflag,
      crimeUnfoundedFlag: reportedEvents.crimeUnfoundedFlag,
      administrativeAdjustmentFlag: reportedEvents.administrativeAdjustmentFlag,
      count: reportedEvents.count,
      cleanupFlag: reportedEvents.cleanupFlag,
      crimeCode: reportedEvents.crimeCode,
      districtCode: reportedEvents.districtCode,
      eventDescription: reportedEvents.eventDescription,
      ileadsAddressNumber: reportedEvents.ileadsAddressNumber,
      ileadsStreetName: reportedEvents.ileadsStreetName,
      neighborhoodCode: reportedEvents.neighborhoodCode,
      eventLocationName: reportedEvents.eventLocationName,
      eventLocationComment: reportedEvents.eventLocationComment,
      cadStreetNumber: reportedEvents.cadStreetNumber,
      cadStreetName: reportedEvents.cadStreetName,
      xCoordinates: reportedEvents.xCoordinates,
      yCoordinates: reportedEvents.yCoordinates,
      crimeCategoryShortened: reportedEvents.crimeCategoryShortened,
      newDateField: reportedEvents.newDateField,
      crimeCategoryData: reportedEvents.crimeCategoryData,
      neighborhoodData: reportedEvents.neighborhoodData,
      codedDateData: reportedEvents.codedDateData
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reportedEvents = this.createFromForm();
    if (reportedEvents.id !== undefined) {
      this.subscribeToSaveResponse(this.reportedEventsService.update(reportedEvents));
    } else {
      this.subscribeToSaveResponse(this.reportedEventsService.create(reportedEvents));
    }
  }

  private createFromForm(): IReportedEvents {
    return {
      ...new ReportedEvents(),
      id: this.editForm.get(['id'])!.value,
      complaintId: this.editForm.get(['complaintId'])!.value,
      codedMonth: this.editForm.get(['codedMonth'])!.value,
      codedMonthAsInt: this.editForm.get(['codedMonthAsInt'])!.value,
      eventOccurred: this.editForm.get(['eventOccurred'])!.value,
      newCrimeflag: this.editForm.get(['newCrimeflag'])!.value,
      crimeUnfoundedFlag: this.editForm.get(['crimeUnfoundedFlag'])!.value,
      administrativeAdjustmentFlag: this.editForm.get(['administrativeAdjustmentFlag'])!.value,
      count: this.editForm.get(['count'])!.value,
      cleanupFlag: this.editForm.get(['cleanupFlag'])!.value,
      crimeCode: this.editForm.get(['crimeCode'])!.value,
      districtCode: this.editForm.get(['districtCode'])!.value,
      eventDescription: this.editForm.get(['eventDescription'])!.value,
      ileadsAddressNumber: this.editForm.get(['ileadsAddressNumber'])!.value,
      ileadsStreetName: this.editForm.get(['ileadsStreetName'])!.value,
      neighborhoodCode: this.editForm.get(['neighborhoodCode'])!.value,
      eventLocationName: this.editForm.get(['eventLocationName'])!.value,
      eventLocationComment: this.editForm.get(['eventLocationComment'])!.value,
      cadStreetNumber: this.editForm.get(['cadStreetNumber'])!.value,
      cadStreetName: this.editForm.get(['cadStreetName'])!.value,
      xCoordinates: this.editForm.get(['xCoordinates'])!.value,
      yCoordinates: this.editForm.get(['yCoordinates'])!.value,
      crimeCategoryShortened: this.editForm.get(['crimeCategoryShortened'])!.value,
      newDateField: this.editForm.get(['newDateField'])!.value,
      crimeCategoryData: this.editForm.get(['crimeCategoryData'])!.value,
      neighborhoodData: this.editForm.get(['neighborhoodData'])!.value,
      codedDateData: this.editForm.get(['codedDateData'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportedEvents>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
