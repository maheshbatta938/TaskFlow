import { Component, Input } from '@angular/core';

export type IconName =
  | 'clipboard'
  | 'check-circle'
  | 'clock'
  | 'trend-up'
  | 'alarm'
  | 'sun'
  | 'moon'
  | 'alert-triangle'
  | 'inbox'
  | 'plus'
  | 'search'
  | 'arrow-left'
  | 'logout';

// A small fixed set of inline SVG icons, selected by name, so templates use
// <app-icon name="..."> instead of emoji — consistent sizing/color/theming
// across the whole app instead of relying on the OS emoji font.
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name: IconName = 'inbox';
  @Input() size = 20;
}
