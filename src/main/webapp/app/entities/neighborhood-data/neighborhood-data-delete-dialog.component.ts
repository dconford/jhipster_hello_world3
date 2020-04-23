import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INeighborhoodData } from 'app/shared/model/neighborhood-data.model';
import { NeighborhoodDataService } from './neighborhood-data.service';

@Component({
  templateUrl: './neighborhood-data-delete-dialog.component.html'
})
export class NeighborhoodDataDeleteDialogComponent {
  neighborhoodData?: INeighborhoodData;

  constructor(
    protected neighborhoodDataService: NeighborhoodDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.neighborhoodDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('neighborhoodDataListModification');
      this.activeModal.close();
    });
  }
}
