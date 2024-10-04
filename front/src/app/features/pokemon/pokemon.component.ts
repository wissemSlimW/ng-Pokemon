import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Pokemon } from '../../shared/types/pokemon';
import { CardComponent } from './components/card/card.component';
import { Id } from '../../shared/types/model';
import { AddCardComponent } from '../../shared/components/add-card/add-card.component';
import { PokemonType } from '../../shared/types/pokemonType';
import { getItem } from '../../shared/utils/getItem';
import { DialogComponent } from './components/dialog/dialog.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'p-pokemons',
  standalone: true,
  templateUrl: './pokemon.component.html',
  imports: [
    CardComponent,
    AddCardComponent,
    DialogComponent,
    DeleteDialogComponent,
  ],
})
export class PokemonComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService
      .getAll<Pokemon>('pokemon')
      .subscribe((res) => (this.pokemon = res));
    this.apiService
      .getAll<Pokemon>('pokemonTypes')
      .subscribe((res) => (this.pokemonTypes = res));
  }
  pokemon: Pokemon[] = [];
  pokemonTypes: PokemonType[] = [];
  deleteItem: Pokemon | null = null;
  formData: Pokemon = { image: '', life: 50, name: '', power: 10, type: 0 };
  @ViewChild('pokemonDialog') addDialog:
    | ElementRef<HTMLDialogElement>
    | undefined;

  openFormDialog(data: Pokemon | undefined) {
    if (!!data) {
      this.formData = data;
    }
    this.addDialog?.nativeElement.showModal();
  }
  closeFormDialog() {
    this.addDialog?.nativeElement.close();
  }
  @ViewChild('deleteDialog') deleteDialog:
    | ElementRef<HTMLDialogElement>
    | undefined;

  openDeleteDialog(item: Pokemon) {
    this.deleteItem = item;
    this.deleteDialog?.nativeElement.showModal();
  }
  closeDeleteDialog() {
    this.deleteDialog?.nativeElement.close();
  }
  getType(id: Id): PokemonType['name'] {
    return (
      getItem({ list: this.pokemonTypes, field: 'id', value: id })?.name || ''
    );
  }
  removeItem() {
    this.apiService
      .delete('pokemon', this.deleteItem!.id!)
      .subscribe(
        (res) =>
          (this.pokemon = this.pokemon.filter(
            (p) => p.id !== this.deleteItem!.id
          ))
      );
    this.closeDeleteDialog();
  }
  manageItem(data: Pokemon) {
    let pokemonIndex = this.pokemon.findIndex((p) => p.id === data.id);
    if (pokemonIndex > -1) {
      this.apiService.update('pokemon', data).subscribe((res) => {
        this.pokemon[pokemonIndex] = res as Pokemon;
      });
    } else
      this.apiService.add('pokemon', data).subscribe((res) => {
        this.pokemon.push(res as Pokemon);
      }); 
    this.closeFormDialog();
  }
}
