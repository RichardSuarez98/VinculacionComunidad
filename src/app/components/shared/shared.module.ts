import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//modulos
import { ReactiveFormsModule } from '@angular/forms';
//Angular Material
//import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule, MatNavList} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { NgChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';

/********** PRIME NG  ************/
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {KnobModule} from 'primeng/knob';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SpeedDialModule} from 'primeng/speeddial';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     /*sngulsr material */
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     ReactiveFormsModule,
     MatSnackBarModule,
     MatProgressSpinnerModule,
     MatToolbarModule,
     MatMenuModule,
     MatIconModule,
     MatPaginatorModule,
     MatTableModule,
     MatSelectModule,
     MatDialogModule,
     MatAutocompleteModule,
     FormsModule,
     MatSidenavModule,
     MatListModule,
     MatExpansionModule,
     MatDividerModule,
     MatTooltipModule,MatCheckboxModule,
     MatDatepickerModule,MatRadioModule,
     MatBottomSheetModule,MatCardModule,MatSlideToggleModule,
     ScrollingModule,MatProgressBarModule, NgChartsModule,MatTabsModule,

     DropdownModule,
     ChartModule,
     CalendarModule,
     ButtonModule,
     KnobModule,SplitButtonModule,SpeedDialModule
     //jsPDF
  ], exports: [
 /*sngulsr material */
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatToolbarModule,
      MatMenuModule,
      MatIconModule,
      MatPaginatorModule,
      MatTableModule,
      MatSelectModule,
      MatDialogModule,
      MatAutocompleteModule,
      FormsModule,
      MatSidenavModule,
      MatListModule,
      MatExpansionModule,
      MatDividerModule,
      MatTooltipModule,MatCheckboxModule,
      MatDatepickerModule,MatRadioModule,MatBottomSheetModule,MatCardModule,MatSlideToggleModule,
      ScrollingModule,MatProgressBarModule, NgChartsModule,MatTabsModule,


      DropdownModule,
      ChartModule,
      CalendarModule,
      ButtonModule,
      KnobModule,SplitButtonModule,SpeedDialModule
      //jsPDF
  ]
})
export class SharedModule { }
