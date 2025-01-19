import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './TriNnovatorApp/TriNnovatorApp.config';

import { AppComponent } from './TriNnovatorApp/TriNnovatorApp.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
