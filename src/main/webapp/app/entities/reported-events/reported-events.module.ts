import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';
import { ReportedEventsComponent } from './reported-events.component';
import { ReportedEventsDetailComponent } from './reported-events-detail.component';
import { ReportedEventsUpdateComponent } from './reported-events-update.component';
import { ReportedEventsDeleteDialogComponent } from './reported-events-delete-dialog.component';
import { reportedEventsRoute } from './reported-events.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild(reportedEventsRoute)],
  declarations: [
    ReportedEventsComponent,
    ReportedEventsDetailComponent,
    ReportedEventsUpdateComponent,
    ReportedEventsDeleteDialogComponent
  ],
  entryComponents: [ReportedEventsDeleteDialogComponent]
})
export class JhipsterHelloWorld3ReportedEventsModule {}
