import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICodedDateData } from 'app/shared/model/coded-date-data.model';
import { CodedDateDataService } from './coded-date-data.service';
import { CodedDateDataDeleteDialogComponent } from './coded-date-data-delete-dialog.component';

@Component({
  selector: 'jhi-coded-date-data',
  templateUrl: './coded-date-data.component.html'
})
export class CodedDateDataComponent implements OnInit, OnDestroy {
  codedDateData?: ICodedDateData[];
  eventSubscriber?: Subscription;

  constructor(
    protected codedDateDataService: CodedDateDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.codedDateDataService.query().subscribe((res: HttpResponse<ICodedDateData[]>) => (this.codedDateData = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCodedDateData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICodedDateData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCodedDateData(): void {
    this.eventSubscriber = this.eventManager.subscribe('codedDateDataListModification', () => this.loadAll());
  }

  delete(codedDateData: ICodedDateData): void {
    const modalRef = this.modalService.open(CodedDateDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.codedDateData = codedDateData;
  }
}
