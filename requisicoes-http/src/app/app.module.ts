import { MatSnackBarConfig } from '@angular/material';
import { PostService } from './post.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { DialodEditPostComponent } from './dialod-edit-post/dialod-edit-post.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DialodEditPostComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
  entryComponents: [DialodEditPostComponent]
})
export class AppModule { }
