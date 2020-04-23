import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'crime-category-data',
        loadChildren: () =>
          import('./crime-category-data/crime-category-data.module').then(m => m.JhipsterHelloWorld3CrimeCategoryDataModule)
      },
      {
        path: 'neighborhood-data',
        loadChildren: () => import('./neighborhood-data/neighborhood-data.module').then(m => m.JhipsterHelloWorld3NeighborhoodDataModule)
      },
      {
        path: 'coded-date-data',
        loadChildren: () => import('./coded-date-data/coded-date-data.module').then(m => m.JhipsterHelloWorld3CodedDateDataModule)
      },
      {
        path: 'reported-events',
        loadChildren: () => import('./reported-events/reported-events.module').then(m => m.JhipsterHelloWorld3ReportedEventsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterHelloWorld3EntityModule {}
