import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OverviewPageComponent } from './components/overview-page/overview-page.component';
import { OverviewTitleComponent } from './components/overview-title/overview-title.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { OverviewCardComponent } from './components/overview-card/overview-card.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [OverviewPageComponent, OverviewTitleComponent, OverviewCardComponent, ModalWindowComponent],
  imports: [CommonModule, OverviewRoutingModule, SharedModule, MaterialModule],
})
export class OverviewModule {}
