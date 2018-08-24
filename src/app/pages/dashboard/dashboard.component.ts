import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lab, LabStats } from '../../@core/data/lab';
import { Subscription } from '../../../../node_modules/rxjs';
import { LabService } from '../../@core/data/lab.service';
import { NbThemeService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

enum OriginOperation { Create, Edit, Delete }

@Component({
  selector: 'chem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private labService: LabService,
    private theme: NbThemeService,
    private modalService: NgbModal,
  ) {}
  lab?: Lab;
  labStats?: LabStats;
  subscription: Subscription;
  themeSubscription = new Subscription();
  newName?: string;
  fsOption = {};
  quotaOption = {};
  originTableSettings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideHeader: true,
    noDataMessage: 'You must add at least one whitelist to make Chembase web sdk work.',
    columns: {
      origin: {
        title: 'Trusted Origin',
        filter: false,
      },
    },
  };
  allowOrigins: { origin: string }[] = [];
  SDK_USAGE: string;
  value = 0;
  ngOnInit() {
    this.subscription = this.labService.getCurrentLab().subscribe(lab => {
      this.lab = lab;
      this.allowOrigins = lab.allowOrigins.map(origin => ({ origin }));
      this.labService.getLabStats(lab).subscribe(stats => {
        this.labStats = stats;
        this.setupChart(Math.round(this.labStats.fsUsedSize / this.labStats.fsTotalSize * 100), 'fsOption');
        this.setupChart(Math.round(this.labStats.storageSize / this.labStats.quotaSize * 100), 'quotaOption');
      });
      this.SDK_USAGE = '<script src="chembase-sdk-v0.0.1"></script>\n'
        + '<script>\n'
        + `var lab = Chembase.Lab('${lab.id}')\n`
        + `</script>\n`;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  editLabName() {
    this.newName = this.lab.name;
  }
  saveLabName() {
    this.labService.updateLab(this.lab.id, {
      name: this.newName,
    }).subscribe(lab => {
      this.labService.setCurrentLab(lab);
    }, error => {
      console.error(error);
    }, () => {
      this.newName = null;
    });
  }

  onCreateOrigin($event) {
    this.updateAllOrigin($event, OriginOperation.Create);
  }
  onEditOrigin($event) {
    this.updateAllOrigin($event, OriginOperation.Edit);
  }
  onDeleteOrigin($event) {
    this.updateAllOrigin($event, OriginOperation.Delete);
  }
  async updateAllOrigin($event, operation: OriginOperation) {
    const newAllowOrigins: string[] = $event.source.data.map(o => o.origin);

    if (operation === OriginOperation.Create) {
      newAllowOrigins.unshift($event.newData.origin);
    } else {
      const index = newAllowOrigins.findIndex(o => o === $event.data.origin);
      if (operation === OriginOperation.Delete) {
        newAllowOrigins.splice(index, 1);
      } else if (operation === OriginOperation.Edit) {
        newAllowOrigins[index] = $event.newData.origin;
      }
    }

    this.labService.updateLab(this.lab.id, {
      allowOrigins: newAllowOrigins,
    }).subscribe(lab => {
      $event.confirm.resolve();
      this.labService.setCurrentLab(lab);
    }, error => {
      console.error(error);
      $event.confirm.reject();
    });
  }

  setupChart(percent: number, target: 'fsOption' | 'quotaOption') {
    this.themeSubscription.add(this.theme.getJsTheme().pipe(delay(1)).subscribe(config => {
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
    }));
  }

  openModal(modal) {
    this.modalService.open(modal);
  }
}
