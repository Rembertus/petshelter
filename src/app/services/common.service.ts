import { Injectable } from "@angular/core";

interface Breed {
  id: number;
  name: string;
}

interface Photo {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class Common {
  public getBreeds(): Breed[] {
    return [
      { id: 1, name: 'Barbet o perro de agua francés' },
      { id: 2, name: 'Pastor Aleman' },
      { id: 3, name: 'Mal-shi' },
      { id: 4, name: 'Shih-poo' },
      { id: 5, name: 'Caniche o poodle toy' },
      { id: 6, name: 'Cazador de alces noruego o Elkhound' },
      { id: 7, name: 'TaLobero irlandéscos' },
      { id: 8, name: 'Bóxer' },
      { id: 9, name: 'Cavalier King Charles Spaniel' },
      { id: 10, name: 'Bichón habanero' }
    ];
  }

  public getPhotos(): Photo[] {
    return [
      { id: 1, name: 'Dog 01', image: 'dog01.jpg' },
      { id: 2, name: 'Dog 02', image: 'dog02.jpg' },
      { id: 3, name: 'Dog 03', image: 'dog03.jpg' },
      { id: 4, name: 'Dog 04', image: 'dog04.jpg' },
      { id: 5, name: 'Dog 05', image: 'dog05.jpg' }
    ];
  }
}
