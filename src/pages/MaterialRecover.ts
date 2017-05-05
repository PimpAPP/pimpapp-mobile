// This class is used to map all materials with
// theris respective name, icon name and colors
// There is a method that returns a Material object by name

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
            case 'papel':
                materialFound = new Material('Papel', 'purple', 'misturado.icon');
            break;
            case 'plastico':
                materialFound = new Material('Plástico', 'purple', 'misturado.icon');
            break;
            case 'metal':
                materialFound = new Material('Metal', 'purple', 'misturado.icon');
            break;
            case 'oleo':
                materialFound = new Material('Óleo', 'purple', 'misturado.icon');
            break;
            case 'eletronico':
                materialFound = new Material('Eletrônicos', 'purple', 'misturado.icon');
            break;
            case 'bateria':
                materialFound = new Material('Bateria', 'purple', 'misturado.icon');
            break;
            case 'moveis':
                materialFound = new Material('Móveis', 'purple', 'misturado.icon');
            break;
            case 'entulho':
                materialFound = new Material('Entulho', 'purple', 'misturado.icon');
            break;
            case 'outros':
                materialFound = new Material('Outros', 'purple', 'misturado.icon');
            break;
        }

        return materialFound;
    }
}