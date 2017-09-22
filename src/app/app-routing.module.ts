import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContestantComponent }   from './contestant/contestant.component';
// import { HeroesComponent }      from './heroes/heroes.component';
// import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: './dashboard/dashboard.component.ts', pathMatch: 'full' },
  { path: 'contestant',  component: ContestantComponent },
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
