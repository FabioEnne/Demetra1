import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServerSetts } from '../pages/home/serverSetts';
import { TabsPage } from '../pages/home/tabs';

@NgModule({
  declarations: [
    MyApp,
      HomePage,
      ServerSetts,
      TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      HomePage,
      ServerSetts,
      TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
