import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
  baseServerUrl = "https://localhost:44378/api/";
constructor(private http : HttpClient) { }

getLots(){
  return this.http.get(this.baseServerUrl + "Lots/ListLots");
}

getServices(){
  return this.http.get(this.baseServerUrl + "Lots/ListServices");
}
getMarques(){
  return this.http.get(this.baseServerUrl + "Lots/ListMarques");
}

// searchLot(string Num_lot, number NB_compteur, date Annee, string Service , string Marque)
// {
//   return this.http.get(this.baseServerUrl + "Lots/search",
//   {
//     num_lot: Num_lot,


//   });


// }


}
