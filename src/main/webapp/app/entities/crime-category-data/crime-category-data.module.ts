import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';
import { CrimeCategoryDataComponent } from './crime-category-data.component';
import { CrimeCategoryDataDetailComponent } from './crime-category-data-detail.component';
import { CrimeCategoryDataUpdateComponent } from './crime-category-data-update.component';
import { CrimeCategoryDataDeleteDialogComponent } from './crime-category-data-delete-dialog.component';
import { crimeCategoryDataRoute } from './crime-category-data.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild(crimeCategoryDataRoute)],
  declarations: [
    CrimeCategoryDataComponent,
    CrimeCategoryDataDetailComponent,
    CrimeCategoryDataUpdateComponent,
    CrimeCategoryDataDeleteDialogComponent
  ],
  entryComponents: [CrimeCategoryDataDeleteDialogComponent]
})
export class JhipsterHelloWorld3CrimeCategoryDataModule {}
