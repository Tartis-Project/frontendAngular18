import {
  Component,
  computed,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MaterialModule } from '../../../material/material.module';
import { CardFormComponent } from '../card-form/card-form.component';
import { Floor } from '../../../pages/parking/interfaces/floor.model';
import { ParkingService } from '../../../pages/parking/services/parking.service';
import { Rate } from '../../../pages/rates/interfaces/rates.model';
import { RateService } from '../../../pages/rates/services/rates.service';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EuroCurrencyPipe } from "../../../core/pipes/euro-currency.pipe";

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [MaterialModule, EuroCurrencyPipe],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent implements OnInit {
  constructor(
    private router: Router,
    readonly dialog: MatDialog,
    private parkingService: ParkingService,
    private ratesService: RateService,
  ) { }

  @Input() floor!: Floor;
  @Input() rate!: Rate;
  @Output() eventLoad = new EventEmitter<void>();

  totalPorHora = 0;

  currentRoute = computed(() => this.router.url);
  isPlazas = computed(() => this.currentRoute().includes('/parking'));
  isTarifas = computed(() => this.currentRoute().includes('/rates'));
  isVehicles = computed(() => this.currentRoute().includes('/vehicles'));

  ngOnInit(): void {
    if (this.rate != undefined) {
      this.totalPorHora = this.rate.pricePerMinute * 60;
    }
  }

  openDialog(): void {
    let dialogData: any = {};

    switch (true) {
      case this.isPlazas():
        dialogData = this.floor;
        break;
      case this.isTarifas():
        dialogData = this.rate;
        break;
      case this.isVehicles():
        dialogData = { brand: 'seat' };
        break;
      default:
        dialogData = {};
        break;
    }

    let dialogRef = this.dialog.open(CardFormComponent, {
      width: '50%',
      height: 'auto',
      data: { dialogData },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.eventLoad.emit();
    });
  }

  openDialogDelete(dialogData: any): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      height: 'auto',
      data: { dialogData },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.eventLoad.emit();
    });
  }

  viewVehicleDetail(): void {
    console.log('Ver detalles del vehículo...');
  }

  deleteAction() {
    switch (true) {
      case this.isPlazas():
        this.openDialogDelete(this.floor);
        break;
      case this.isTarifas():
        this.openDialogDelete(this.rate);
        break;
      case this.isVehicles():
        break;
      default:
    }
  }
}
