import { Component, Input } from '@angular/core';
import { IconName } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent {
  @Input() title = 'Nothing here yet';
  @Input() message = '';
  @Input() icon: IconName = 'inbox';
}
