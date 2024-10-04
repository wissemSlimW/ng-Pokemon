import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../../shared/types/pokemon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonType } from '../../../../shared/types/pokemonType';
@Component({
  selector: 'p-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  imports: [FormsModule, CommonModule],
})
export class DialogComponent {
  @Input() pokemon: Pokemon | undefined;
  @Input() pokemonTypes: PokemonType[] = [];
  @Output() confirmAddEmitter = new EventEmitter<Pokemon>();
  @Output() closeEmitter = new EventEmitter();
  handleSubmit() {
    this.confirmAddEmitter.emit({
      ...this.pokemon!,
      life: +this.pokemon!.life,
      power: +this.pokemon!.power!,
      type: +this.pokemon!.type!,
    });
  }
  handleClose() {
    this.closeEmitter.emit();
  }
}
