import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICodedDateData } from 'app/shared/model/coded-date-data.model';
import { CodedDateDataService } from './coded-date-data.service';

@Component({
  templateUrl: './coded-date-data-delete-dialog.component.html'
})
export class CodedDateDataDeleteDialogComponent {
  codedDateData?: ICodedDateData;

  constructor(
    protected codedDateDataService: CodedDateDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.codedDateDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('codedDateDataListModification');
      this.activeModal.close();
    });
  }
}
