import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';
import { NeighborhoodDataComponent } from './neighborhood-data.component';
import { NeighborhoodDataDetailComponent } from './neighborhood-data-detail.component';
import { NeighborhoodDataUpdateComponent } from './neighborhood-data-update.component';
import { NeighborhoodDataDeleteDialogComponent } from './neighborhood-data-delete-dialog.component';
import { neighborhoodDataRoute } from './neighborhood-data.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild(neighborhoodDataRoute)],
  declarations: [
    NeighborhoodDataComponent,
    NeighborhoodDataDetailComponent,
    NeighborhoodDataUpdateComponent,
    NeighborhoodDataDeleteDialogComponent
  ],
  entryComponents: [NeighborhoodDataDeleteDialogComponent]
})
export class JhipsterHelloWorld3NeighborhoodDataModule {}
