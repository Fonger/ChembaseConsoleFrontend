import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lab, LabStats } from '../../@core/data/lab';
import { Subscription } from '../../../../node_modules/rxjs';
import { LabService } from '../../@core/data/lab.service';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import * as echarts from 'echarts';

@Component({
  selector: 'chem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private labService: LabService, private theme: NbThemeService) {}
  lab?: Lab;
  labStats?: LabStats;
  subscription: Subscription;
  themeSubscription: Subscription;
  fsOption = {};
  quotaOption = {};
  value = 0;
  ngOnInit() {
    this.subscription = this.labService.getCurrentLab().subscribe(lab => {
      this.lab = lab
      this.labService.getLabStats(lab).subscribe(stats => {
        this.labStats = stats;
        this.setupChart(Math.round(this.labStats.fsUsedSize / this.labStats.fsTotalSize * 100), 'fsOption');
        this.setupChart(Math.round(this.labStats.storageSize / this.labStats.quotaSize * 100), 'quotaOption');
      })
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.themeSubscription.unsubscribe()
  }
  setupChart(percent: number, target: 'fsOption' | 'quotaOption') {
    this.themeSubscription = this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
      const solarTheme: any = config.variables.solar;

      this[target] = Object.assign({}, {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['50%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: percent,
                name: ' ',
                label: {
                  normal: {
                    position: 'center',
                    formatter: '{d}%',
                    textStyle: {
                      fontSize: '22',
                      fontFamily: config.variables.fontSecondary,
                      fontWeight: '600',
                      color: config.variables.fgHeading,
                    },
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 100 - percent,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: config.variables.layoutBg,
                  },
                },
              },
            ],
          },
          {
            name: ' ',
            clockWise: true,
            hoverAnimation: false,
            type: 'pie',
            center: ['50%', '50%'],
            radius: solarTheme.radius,
            data: [
              {
                value: percent,
                name: ' ',
                label: {
                  normal: {
                    position: 'inner',
                    show: false,
                  },
                },
                tooltip: {
                  show: false,
                },
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: solarTheme.gradientLeft,
                      },
                      {
                        offset: 1,
                        color: solarTheme.gradientRight,
                      },
                    ]),
                    shadowColor: solarTheme.shadowColor,
                    shadowBlur: 7,
                  },
                },
                hoverAnimation: false,
              },
              {
                value: 28,
                name: ' ',
                tooltip: {
                  show: false,
                },
                label: {
                  normal: {
                    position: 'inner',
                  },
                },
                itemStyle: {
                  normal: {
                    color: 'none',
                  },
                },
              },
            ],
          },
        ],
      });
    });
  }
}
