import { ChangeDetectionStrategy,ChangeDetectorRef, Component,OnInit,NgZone } from '@angular/core';
import { NgIf } from '@angular/common';
import {SpinnerService} from './spinner.service';

@Component({
  selector: 'TriNnovatorApp-spinner',
  standalone: true, 
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

    showSpinner = false;
    constructor(private spinnerService: SpinnerService,private cdRef: ChangeDetectorRef,private ngZone: NgZone){
        
    }
    ngOnInit() {
        this.init();
    }
    
       init() {
        this.ngZone.run(() => {
          this.spinnerService.getSpinnerObserver().subscribe((status) => {
            this.showSpinner = status === 'start';
            this.cdRef.markForCheck();
          });
        });
      }
}

