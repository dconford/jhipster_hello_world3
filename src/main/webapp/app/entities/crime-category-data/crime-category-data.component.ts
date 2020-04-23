import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrimeCategoryData } from 'app/shared/model/crime-category-data.model';
import { CrimeCategoryDataService } from './crime-category-data.service';
import { CrimeCategoryDataDeleteDialogComponent } from './crime-category-data-delete-dialog.component';

@Component({
  selector: 'jhi-crime-category-data',
  templateUrl: './crime-category-data.component.html'
})
export class CrimeCategoryDataComponent implements OnInit, OnDestroy {
  crimeCategoryData?: ICrimeCategoryData[];
  eventSubscriber?: Subscription;

  constructor(
    protected crimeCategoryDataService: CrimeCategoryDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.crimeCategoryDataService.query().subscribe((res: HttpResponse<ICrimeCategoryData[]>) => (this.crimeCategoryData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCrimeCategoryData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICrimeCategoryData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCrimeCategoryData(): void {
    this.eventSubscriber = this.eventManager.subscribe('crimeCategoryDataListModification', () => this.loadAll());
  }

  delete(crimeCategoryData: ICrimeCategoryData): void {
    const modalRef = this.modalService.open(CrimeCategoryDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.crimeCategoryData = crimeCategoryData;
  }
}
