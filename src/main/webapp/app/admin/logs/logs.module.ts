import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [JhipsterHelloWorld3SharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}
