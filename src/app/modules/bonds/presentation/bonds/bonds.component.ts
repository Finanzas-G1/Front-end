import { Component, OnInit } from '@angular/core';
import { BondsService } from '../services/bonds.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CurrencyPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon'; // Asegúrate de importar el servicio correctamente
import { Router } from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {ConfigService} from '../../../config/services/config.service'; // Importar Router para navegación

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  imports: [
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatFormField,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    CurrencyPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatGridTile,
    MatGridList
  ],
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent implements OnInit {
  bondFormData = {
    nombre: '',
    tasa: 0,
    plazo: 0,
    valorNominal: 0,
    fechaEmision: '',
    fechaVencimiento: '',
    capitalization: '', // Capitalization como frecuencia de pagos
    interestType: '',  // interestType del config
    gracePeriod: '',   // gracePeriod del config
  };

  valoraciones: any[] = [];
  displayedColumns: string[] = ['nombre', 'valorNominal', 'tasa', 'plazo', 'capitalization', 'gracePeriod', "interestType", 'acciones'];

  usuarioId: string = localStorage.getItem('usuarioId') || '';  // Obtener usuarioId desde localStorage

  constructor(private bondsService: BondsService, private router: Router, private configService: ConfigService) {}

  ngOnInit(): void {
    if (this.usuarioId) {
      this.loadBonds();
      this.loadUserConfig();  // Cargar configuración del usuario
    } else {
      console.log('Usuario no autenticado');
      this.router.navigate(['/login']);  // Redirigir si no hay un usuario logueado
    }
  }

  loadBonds() {
    this.bondsService.getBondsByUser(this.usuarioId).subscribe(response => {
      this.valoraciones = response;
      // Ya no necesitamos modificar los bonos con la configuración, porque ya deberían tenerla
    });
  }



  loadUserConfig() {
    // Cargar la configuración del usuario desde la API o JSON
    this.configService.getConfig(this.usuarioId).subscribe((config: any) => {
      if (config) {
        // Asignamos los valores de la configuración a los campos correspondientes
        this.bondFormData.interestType = config.interestType;
        this.bondFormData.gracePeriod = config.gracePeriod;
        this.bondFormData.capitalization = config.capitalization;  // Capitalization como frecuencia de pagos
      }
    }, (error) => {
      console.error('Error al cargar la configuración del usuario', error);
    });
  }

  // Método para calcular el plazo entre la fecha de emisión y vencimiento (en años)
  calculatePlazo() {
    const fechaEmision = new Date(this.bondFormData.fechaEmision);
    const fechaVencimiento = new Date(this.bondFormData.fechaVencimiento);
    const diferenciaTiempo = fechaVencimiento.getTime() - fechaEmision.getTime();
    this.bondFormData.plazo = Math.floor(diferenciaTiempo / (1000 * 3600 * 24 * 365)); // En años
  }

  // Método para agregar un bono
  onSubmit() {
    if (this.bondFormData.nombre && this.bondFormData.valorNominal && this.bondFormData.fechaEmision && this.bondFormData.fechaVencimiento && this.bondFormData.tasa) {
      // Calcular el plazo antes de enviar el bono
      this.calculatePlazo();

      // Obtener la configuración del usuario para completar los campos del bono
      this.configService.getConfig(this.usuarioId).subscribe(config => {
        if (config) {
          // Si la tasa de interés es "Efectiva", dejamos vacío el campo "capitalization"
          const capitalization = config.interestType === 'Efectiva' ? '' : config.capitalization;

          // Completar la configuración antes de crear el bono
          const newBond = {
            nombre: this.bondFormData.nombre,
            tasa: this.bondFormData.tasa,
            valorNominal: this.bondFormData.valorNominal,
            fechaEmision: this.bondFormData.fechaEmision,
            fechaVencimiento: this.bondFormData.fechaVencimiento,
            usuarioId: this.usuarioId,
            plazo: this.bondFormData.plazo,
            capitalization: capitalization,  // Aquí está el ajuste para "Efectiva"
            interestType: config.interestType,
            gracePeriod: config.gracePeriod
          };

          this.bondsService.addBond(newBond).subscribe(response => {
            console.log('Bono agregado:', response);
            this.loadBonds();  // Recargar la lista de bonos después de agregar uno nuevo
            this.bondFormData = { nombre: '', valorNominal: 0, interestType: '', fechaEmision: '', fechaVencimiento: '', gracePeriod: '', capitalization: '', tasa: 0, plazo: 0 };  // Limpiar el formulario
          });
        }
      }, error => {
        console.error('Error al obtener la configuración del usuario', error);
      });
    } else {
      console.log('Por favor complete todos los campos obligatorios');
    }
  }

  // Método para manejar la edición de un bono
  editBond(bondId: string) {
    const bondToEdit = this.valoraciones.find(bond => bond.id === bondId);
    if (bondToEdit) {
      this.bondFormData = { ...bondToEdit };

      // Configuración de visibilidad y valores según tipo de interés
      if (this.bondFormData.interestType === 'Efectiva') {
        this.bondFormData.capitalization = '';  // Dejar en blanco si la tasa es efectiva
      }
    }
  }

  // Método para navegar a la página de Home
  navigateToHome(): void {
    this.router.navigate(['/inicio']);
  }

  // Método para eliminar una valoración de bono
  deleteBond(bondId: string) {
    this.bondsService.deleteBond(bondId).subscribe(() => {
      this.valoraciones = this.valoraciones.filter(bond => bond.id !== bondId);
    });
  }
}
