import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddCardComponent } from '../../shared/components/add-card/add-card.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { ApiService } from '../../shared/services/api.service';
import { Pokemon } from '../../shared/types/pokemon';
import { Team } from '../../shared/types/team';
import { CardComponent } from './components/card/card.component';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'p-teams',
  standalone: true,
  templateUrl: './teams.component.html',
  imports: [
    CardComponent,
    AddCardComponent,
    DeleteDialogComponent,
    DialogComponent,
  ],
})
export class TeamsComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.getAll<Team>('teams').subscribe(
      (res) =>
        (this.teams = res.map((team) => ({
          ...team,
          pokemonIds: team.pokemon?.map((p) => p.id!),
        })))
    );
  }
  teams: Team[] = [];
  deleteItem: Team | null = null;
  formData: Team = { name: '', pokemonIds: [], pokemon: [] };

  // dialogs
  @ViewChild('teamDialog') addDialog: ElementRef<HTMLDialogElement> | undefined;
  openFormDialog(data: Team | undefined) {
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

  openDeleteDialog(item: Team) {
    this.deleteItem = item;
    this.deleteDialog?.nativeElement.showModal();
  }
  closeDeleteDialog() {
    this.deleteDialog?.nativeElement.close();
  }

  //actions

  removeItem() {
    this.apiService
      .delete('teams', this.deleteItem!.id!)
      .subscribe(
        (res) =>
          (this.teams = this.teams.filter((p) => p.id !== this.deleteItem!.id))
      );
    this.closeDeleteDialog();
  }
  manageItem(data: Team) {
    const { pokemon:pokemonList, ..._data } = data;
    let teamIndex = this.teams.findIndex((p) => p.id === data.id);
    if (teamIndex > -1) {
      this.apiService
        .update('teams', _data)
        .subscribe(
          (res) => (this.teams[teamIndex] = { ...res, pokemon:pokemonList } as Team)
        );
    } else
      this.apiService
        .add('teams', _data)
        .subscribe((res) => this.teams.push({ ...res, pokemon:pokemonList } as Team));
    this.closeFormDialog();
  }
}
