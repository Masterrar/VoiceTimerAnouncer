import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioTimerCreatorComponent } from './audio-timer-creator/audio-timer-creator.component';

import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WebAudioModule} from '@ng-web-apis/audio';

@NgModule({
  declarations: [
    AppComponent,
    AudioTimerCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    WebAudioModule,
    BrowserModule.withServerTransition({appId: 'demo'}),
  ],
  providers: [
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
