import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '**',
    loadComponent: () =>
      import('./features/typer/typer.component').then(t => t.TyperComponent),
  },
];
