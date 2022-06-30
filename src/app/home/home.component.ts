import { Component, OnInit } from '@angular/core';
import { Lot } from '../Model/lot';
import { LotsService } from '../services/Lots.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// lots: any;
listOfLot: Lot[];
listOfService: string[];
listeOfMarque: string[];
selectedService : string;
selectedMarque: string;
fileName= 'ExcelSheet.xlsx';

  constructor(private lotsService: LotsService) {
    this.lotsService.getLots().subscribe((data: Lot[]) =>{
      // console.warn(data);
    this.listOfLot=data;

    });

    this.lotsService.getServices().subscribe((services:any)=>{
      // console.warn(services);
      this.listOfService = services;
    });

    this.lotsService.getMarques().subscribe((marques: any) =>{
      // console.warn(marques);
      this.listeOfMarque=marques
    });

   }


  ngOnInit() {
  }


  listOfColumn = [
    {
      title: 'N° du lot',
      compare: null,
      priority: false
    },
    {
      title: 'Marque',
      compare: (a: Lot, b: Lot) => null,
      priority: 3
    },
    {
      title: 'Diamètre',
      compare: (a: Lot, b: Lot) => a.diA_LOT_APT - b.diA_LOT_APT,
      priority: 2
    },
    {
      title: 'Service',
      compare: null,
      priority: false
    },
    {
      title: 'Nb Compteur',
      compare: (a: Lot, b: Lot) => a.nB_CMP_LOT - b.nB_CMP_LOT,
      priority: 1
    },
    {
      title: 'Fournisseur',
      compare: null,
      priority: 4
    },
    {
      title: 'Code Marche',
      compare:null,
      priority: false
    },
    {
      title: 'Quantité Marche',
      compare: (a: Lot, b: Lot) => a.qtE_MRC_LOT - b.qtE_MRC_LOT,
      priority: 5
    },

  ];

  // getServices(){
  //   for(var i=0; i< this.listOfLot.length; i++){
  //       this.listOfService=this.listOfLot[i].svC_LOT_APT;
  //   }
  //   return this.listOfService;
  // }

  // getMarques(){
  //   for(var i=0; i< this.listOfLot.length && this.listOfLot.length >0 ; i++){
  //       this.listeOfMarque=this.listOfLot[i].mrQ_LOT_APT;
  //   }
  //   return this.listeOfMarque;
  // }

  exportToExcel(){
   let element =document.getElementById('lots-table');
   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

   XLSX.writeFile(wb,this.fileName);
  }

}
