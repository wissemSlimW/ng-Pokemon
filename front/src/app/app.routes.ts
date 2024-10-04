import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/pokemon/pokemon.routes').then((m) => m.routes),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./features/teams/teams.routes').then((m) => m.routes),
  },

  {
    path: 'battle-portal',
    loadChildren: () =>
      import('./features/battle-portal/battle-portal.routes').then(
        (m) => m.routes
      ),
  },
];
