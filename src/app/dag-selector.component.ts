import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dag-selector',
  templateUrl: 'dag-selector.html'
})

export class DAGSelectorComponent {
  @Input() type: string;
}
