import { Component, Input } from '@angular/core';

@Component({
  selector: 'p-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  @Input() imgUrl: string = '';
  @Input() isActive: boolean = true;
  @Input() isInCombat: boolean = false;
}
