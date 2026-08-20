import { Component, Input } from '@angular/core';
import { IconName } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-analytics-card',
  templateUrl: './analytics-card.component.html',
  styleUrls: ['./analytics-card.component.scss'],
})
export class AnalyticsCardComponent {
  @Input() label = '';
  @Input() value: number | string = 0;
  @Input() icon: IconName = 'clipboard';
  @Input() variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
}
