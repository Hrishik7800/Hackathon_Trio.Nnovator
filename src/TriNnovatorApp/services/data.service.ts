import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private configurationData: any;
  private typeMappingData :any;
  private specialCharacterData: any;
  private fieldMappingData: any;
  private rulesData: any;
  importData: any;
  // apiUrl: any;

  // constructor() { }

  constructor(private http: HttpClient, private route: ActivatedRoute ,
      private router: Router) { 

  }
 
  // getItemById(id1:string, id2: string): Observable<any> {
  //   debugger;
  //   // return this.http.get(`${this.apiUrl}/${id1}/${id2}`); // Fetch data for the specific item
  // }

  setConfigurationData(data: any) {
    this.configurationData = data;
  }

  getConfigurationData() {
    return this.configurationData;
  }

  setTypeMappingData(data:any){
    this.typeMappingData =data;
  }

  getTypeMappingData(){
    return this.typeMappingData;
  }

  setFieldMappingData(data:any){
    this.fieldMappingData =data;
  }

  getFieldMappingData(){
    return this.fieldMappingData;
  }


  setSpecialCharacterData(data: any){
    this.specialCharacterData = data;
  }

  getSpecialCharacterData(){
    return this.specialCharacterData;
  }

  setRulesData(data: any){
    return this.rulesData = data;
  }
  getRulesData(){
    return this.rulesData;
  }
}