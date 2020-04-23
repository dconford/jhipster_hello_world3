import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICrimeCategoryData } from 'app/shared/model/crime-category-data.model';
import { CrimeCategoryDataService } from './crime-category-data.service';

@Component({
  templateUrl: './crime-category-data-delete-dialog.component.html'
})
export class CrimeCategoryDataDeleteDialogComponent {
  crimeCategoryData?: ICrimeCategoryData;

  constructor(
    protected crimeCategoryDataService: CrimeCategoryDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crimeCategoryDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('crimeCategoryDataListModification');
      this.activeModal.close();
    });
  }
}
