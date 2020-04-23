import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INeighborhoodData } from 'app/shared/model/neighborhood-data.model';
import { NeighborhoodDataService } from './neighborhood-data.service';
import { NeighborhoodDataDeleteDialogComponent } from './neighborhood-data-delete-dialog.component';

@Component({
  selector: 'jhi-neighborhood-data',
  templateUrl: './neighborhood-data.component.html'
})
export class NeighborhoodDataComponent implements OnInit, OnDestroy {
  neighborhoodData?: INeighborhoodData[];
  eventSubscriber?: Subscription;

  constructor(
    protected neighborhoodDataService: NeighborhoodDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.neighborhoodDataService.query().subscribe((res: HttpResponse<INeighborhoodData[]>) => (this.neighborhoodData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNeighborhoodData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INeighborhoodData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNeighborhoodData(): void {
    this.eventSubscriber = this.eventManager.subscribe('neighborhoodDataListModification', () => this.loadAll());
  }

  delete(neighborhoodData: INeighborhoodData): void {
    const modalRef = this.modalService.open(NeighborhoodDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.neighborhoodData = neighborhoodData;
  }
}
