import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieComponent } from './serie.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, SerieComponent, HttpClientModule],
  exports: [CommonModule, SerieComponent],
})
export class SerieModule {}
