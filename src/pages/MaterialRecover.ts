import { Material } from './Material';


export class MaterialRecover{
    findMaterial(material){
        let materialFound;
        switch (material){
            case 'vidro':
                materialFound = new Material('Vidro', 'yellow', 'vidro.icon');
            break;
            case 'lata':
                materialFound = new Material('Lata', 'blue', 'lata.icon');
            break;
            case 'misturado':
                materialFound = new Material('Misturado', 'purple', 'misturado.icon');
            break;
        }

        return materialFound;
    }
}