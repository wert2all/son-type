import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'type',
    loadComponent: () =>
      import('./features/type/type-page.component').then(
        t => t.TypePageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/typer/typer.component').then(
        t => t.TyperContainerComponent
      ),
  },
];
