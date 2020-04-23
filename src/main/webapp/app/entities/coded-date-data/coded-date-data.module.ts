import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';
import { CodedDateDataComponent } from './coded-date-data.component';
import { CodedDateDataDetailComponent } from './coded-date-data-detail.component';
import { CodedDateDataUpdateComponent } from './coded-date-data-update.component';
import { CodedDateDataDeleteDialogComponent } from './coded-date-data-delete-dialog.component';
import { codedDateDataRoute } from './coded-date-data.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild(codedDateDataRoute)],
  declarations: [CodedDateDataComponent, CodedDateDataDetailComponent, CodedDateDataUpdateComponent, CodedDateDataDeleteDialogComponent],
  entryComponents: [CodedDateDataDeleteDialogComponent]
})
export class JhipsterHelloWorld3CodedDateDataModule {}
