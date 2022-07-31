import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isExpanded: boolean=false;
  expan: boolean=false;
  expanPersona: boolean=false;
  expanVenta: boolean=false;
  
  
  showFiller = false;
  nomusu:any
  
  constructor(private route: Router) { }


  ngOnInit(): void {
    
  }


  
/*
  <script type="text/javascript">
            $(document).ready(function(){
                $(".sidebar-btn").click(function(){
                    $(".wrapper").toggleClass("collapse");
                });
            });
            </script>*/

  

}


