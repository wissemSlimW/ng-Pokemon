import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '/',
    loadChildren: () =>
      import('./features/pokemons/pokemons.routes').then((m) => m.routes),
  },
  {
    path: '/teams',
    loadChildren: () =>
      import('./features/teams/teams.routes').then((m) => m.routes),
  },

  {
    path: '/battle-portal',
    loadChildren: () =>
      import('./features/battle-portal/battle-portal.routes').then(
        (m) => m.routes
      ),
  },
];
