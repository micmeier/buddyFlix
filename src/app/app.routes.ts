import { Routes } from '@angular/router';
import {AppLayout} from './layout/component/app.layout';
import {Dashboard} from './pages-template/dashboard/dashboard';
import {Documentation} from './pages-template/documentation/documentation';
import {Homepage} from './page/homepage/homepage.component';
import {MovieDetail} from './page/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Homepage },
      { path: 'movies/:id', component: MovieDetail },
      { path: 'dashboard', component: Dashboard },
      { path: 'uikit', loadChildren: () => import('./pages-template/uikit/uikit.routes') },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./pages-template/pages.routes') }
    ]
  },
];
