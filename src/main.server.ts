import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './TriNnovatorApp/TriNnovatorApp.component';
import { config } from './TriNnovatorApp/TriNnovatorApp.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
