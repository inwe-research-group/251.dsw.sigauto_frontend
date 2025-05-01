import { Component, inject, TemplateRef } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastContainerComponent } from '@components/toast-container/toast-container.component';

import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-toast-global',
  standalone: true,
	imports: [NgbTooltipModule, ToastContainerComponent],
  templateUrl: './toast-global.component.html',
  styleUrl: './toast-global.component.scss'
})
export class ToastGlobalComponent {
}
