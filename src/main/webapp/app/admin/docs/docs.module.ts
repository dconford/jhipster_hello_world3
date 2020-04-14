import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent]
})
export class DocsModule {}
