
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { WebServiceUtilities } from '../../../services/webservice.utilities';

@Component({
  selector: 'TriNnovatorApp-loginlayout',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, DropdownModule, CommonModule],
})
export class LoginComponent implements OnInit {
  submitted = false;
  userName: string = '';
  password: string = '';
  iteration: string = '';
  selectedIteration: any;
  iterationOptions: any[] = [];
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient,
    private webServiceUtilities: WebServiceUtilities
  ) {}

  ngOnInit() {
    this.fetchIterations();
    
  }

    //Modified fetch Iterations
  fetchIterations() {
    // Hardcoded iteration values
    // const iterations = [
    //   { name: 'Test1' }, // Hardcoded iteration
    //   { name: 'Test2' }, 
    //   { name: 'Test3' },  // "New" placeholder
    // ];
    // this.iteration='Test';
  
    // Ensure "New" is at the beginning of the array
    // const newIndex = iterations.findIndex((iteration) => iteration.name === 'New');
    // if (newIndex !== -1 && newIndex > 0) {
    //   iterations.splice(newIndex, 1); // Remove "New" from its current position
    //   iterations.unshift({ name: 'New' }); // Add "New" to the beginning
    // }
  
    // Check if the "New" placeholder is already present (unlikely here due to hardcoded data)
    // const isNewPlaceholderPresent = iterations.some((iteration) => iteration.name === 'New');
    // if (!isNewPlaceholderPresent) {
    //   const newPlaceholder = { name: 'New' };
    //   iterations.unshift(newPlaceholder); // Add at the beginning of the array
    // }
  
    // Assign the hardcoded iterations to the iterationOptions variable
    // this.iterationOptions = iterations;
    // console.log(this.iterationOptions);
  }
  

  

  closeErrorMessage() {
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.submitted = true;
    // if (!this.selectedIteration) {
    //   this.errorMessage = 'Please select the iteration.';
    //   return;
    // }
    
    let formData: any = {
      userName: this.userName,
      password: this.password,
      grant_type: 'password',
      scope: 'Innovator',
      client_id: 'IOMApp',
      database: 'InnovatorSolutionsReleased31',
      iteration: 'Test1',
    };
    // Set username and selected Data data in webserviceutils if needed
    // if (this.selectedIteration.name === 'New') {
    //   const newIterationValue = (
    //     document.getElementById('dynamicInput') as HTMLInputElement
    //   ).value.trim();
    //   if (newIterationValue !== '') {
    //     formData.newIteration = newIterationValue;
    //   }
    // }
  
    console.log(formData);
  
    this.auth.login(formData).subscribe(
      (response: any) => {
        // On successful login, update local storage and service values
        const iterationName = this.selectedIteration ? this.selectedIteration.name : '';
        const userName = this.userName;
  
        // Update local storage
        localStorage.setItem('iteration', iterationName);
        localStorage.setItem('userName', userName);
  
        // Update service values
        this.webServiceUtilities.updateSession(iterationName, userName);
  
        // Navigate to transformation page
        // this.router.navigate(['/importdata']);
                this.router.navigate(['']);

      },
      (error: any) => {
        if (error.status === 400 || error.status === 401) {
          this.errorMessage = error.error.message;
        }
        console.error('Login error:', error);
      }
    );
  }

  onLogin(access_token: string) {
    this.webServiceUtilities.updateSessionToken(access_token);
  }

  refreshPage() {
    location.reload();
  }
}
