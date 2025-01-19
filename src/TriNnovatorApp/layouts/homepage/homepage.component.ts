import { Component, OnInit, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { LayoutComponent } from '../layout.component';
import { TopbarComponent } from '../../components/navigation/topbar/topbar.component';
@Component({
  selector: 'TriNnovatorApp-homepage',
  standalone: true,
  imports: [ChartModule, ProgressBarModule ,LayoutComponent , TopbarComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  piedata: any;
  pieoptions: any;
  doughnutdata: any;
  doughnutoptions: any;
  bardata: any;
  baroptions: any;
  polardata: any;
  polaroptions: any;
  radardata: any;
  radaroptions: any;
  linedata: any;
  lineoptions: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const docStyle = window.getComputedStyle(this.el.nativeElement);
      const color = (property: string) => docStyle.getPropertyValue(property);

      const setCommonOptions = (options: any) => ({
        plugins: {
          legend: {
            labels: { color: color('--text-color') }
          }
        },
        ...options
      });

      //Pie Chart
      this.piedata = {
        labels: ['A', 'B', 'C'],
        datasets: [{
          label: ['A', 'B', 'C'],
          data: [540, 325, 702],
          backgroundColor: [color('--blue-700'), color('--yellow-500'), color('--green-500')],
          hoverBackgroundColor: [color('--blue-400'), color('--yellow-400'), color('--green-400')]
        }]
      };
      this.pieoptions = setCommonOptions({});

      //Doughnut Chart
      this.doughnutdata = {
        labels: ['A', 'B', 'C'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [color('--blue-500'), color('--yellow-500'), color('--green-500')],
          hoverBackgroundColor: [color('--blue-400'), color('--yellow-400'), color('--green-400')]
        }]
      };
      this.doughnutoptions = setCommonOptions({ cutout: '60%' });

      //Polar Chart
      this.polardata = {
        datasets: [{
          data: [11, 16, 7, 3],
          backgroundColor: [color('--indigo-500'), color('--purple-500'), color('--teal-500'), color('--orange-500')],
          label: 'My dataset'
        }],
        labels: ['Indigo', 'Purple', 'Teal', 'Orange']
      };
      this.polaroptions = setCommonOptions({ scales: { r: { grid: { color: color('--surface-border') } } } });

      //Radar Chart
      this.radardata = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'My First dataset',
          borderColor: color('--indigo-400'),
          pointBackgroundColor: color('--indigo-400'),
          pointBorderColor: color('--indigo-400'),
          pointHoverBackgroundColor: color('--text-color'),
          pointHoverBorderColor: color('--indigo-400'),
          data: [65, 59, 90, 81, 56, 55, 40]
        }, {
          label: 'My Second dataset',
          borderColor: color('--purple-400'),
          pointBackgroundColor: color('--purple-400'),
          pointBorderColor: color('--purple-400'),
          pointHoverBackgroundColor: color('--text-color'),
          pointHoverBorderColor: color('--purple-400'),
          data: [28, 48, 40, 19, 96, 27, 100]
        }]
      };
      this.radaroptions = setCommonOptions({ scales: { r: { grid: { color: color('--text-color-secondary') } } } });

      //Line Chart
      this.linedata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: color('--primary-500'),
          borderColor: color('--primary-500'),
          tension: 0.4
        }, {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: color('--primary-200'),
          borderColor: color('--primary-200'),
          tension: 0.4
        }]
      };
      this.lineoptions = setCommonOptions({
        scales: {
          x: {
            ticks: { color: color('--text-color-secondary'), font: { weight: 500 } },
            grid: { color: color('--surface-border'), drawBorder: false }
          },
          y: {
            ticks: { color: color('--text-color-secondary') },
            grid: { color: color('--surface-border'), drawBorder: false }
          }
        }
      });

      //Bar Chart
      this.bardata = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: color('--primary-500'),
          borderColor: color('--primary-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        }, {
          label: 'My Second dataset',
          backgroundColor: color('--primary-200'),
          borderColor: color('--primary-200'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }]
      };
      this.baroptions = setCommonOptions({
        scales: {
          x: {
            ticks: { color: color('--text-color-secondary'), font: { weight: 500 } },
            grid: { display: false, drawBorder: false }
          },
          y: {
            ticks: { color: color('--text-color-secondary') },
            grid: { color: color('--surface-border'), drawBorder: false }
          }
        }
      });
    }
  }
}

