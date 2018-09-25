// This class is used to map all materials with
// theris respective name, icon name and colors
// There is a method that returns a Material object by name

import { Material } from './Material';


export class MaterialRecover{
    
    findMaterial(material){
        let materialFound;
        switch (material){
            case 'vidro':
                materialFound = new Material(1, 'Vidro', 
                    'Icones_materiais-vidro.png', '#2CA534', 0.19);
            break;
            case 'lata':
                materialFound = new Material(2, 'Lata', 
                    'Icones_materiais-lata.png', '#FCD301', 1.59);
            break;
            case 'misturado':
                materialFound = new Material(3, 'Misturado', 
                    'Icones_materiais-misturado.png', '#d000cd', 0.21);
            break;
            case 'papel':
                materialFound = new Material(4, 'Papel', 'Icones_materiais-papel.png', 
                    '#1740ff', 0.31);
            break;
            case 'plastico':
                materialFound = new Material(5, 'Plástico', 'Icones_materiais-plastico.png', 
                    '#CF1313', 0.99);
            break;
            case 'metal':
                materialFound = new Material(6, 'Metal', 'Icones_materiais-metal.png', 
                    '#e78b00', 0.32);
            break;
            case 'oleo':
                materialFound = new Material(7, 'Óleo', 'Icones_materiais-oleo.png', 
                    '#895a34', 0.06);
            break;
            case 'eletronico':
                materialFound = new Material(8, 'Eletrônicos', 'Icones_materiais-eletronico.png', 
                    '#7244e7', 1.32);
            break;
            case 'bateria':
                materialFound = new Material(9, 'Bateria', 'Icones_materiais-bateria.png', 
                    '#8f852b', 0.90);
            break;
            case 'moveis':
                materialFound = new Material(10, 'Móveis', 'Icones_materiais-moveis.png', 
                    '#64b3e4', 0.68);
            break;
            case 'entulho':
                materialFound = new Material(11, 'Entulho', 'Icones_materiais-entulho.png', 
                    '#b1b1b1', 0.02);
            break;
            case 'outros':
                materialFound = new Material(12, 'Outros', 'Icones_materiais-poda.png', 
                    '#595959', 0.01);
            break;
        }

        return materialFound;
    }

    findMaterialId(material_id){
        let materialFound;
        switch (material_id){
            case 1:
                materialFound = new Material(1, 'Vidro', 
                    'Icones_materiais-vidro.png', '#2CA534', 0.19);
            break;
            case 2:
                materialFound = new Material(2, 'Lata', 
                    'Icones_materiais-lata.png', '#FCD301', 1.59);
            break;
            case 3:
                materialFound = new Material(3, 'Misturado', 
                    'Icones_materiais-misturado.png', '#d000cd', 0.21);
            break;
            case 4:
                materialFound = new Material(4, 'Papel', 'Icones_materiais-papel.png', 
                    '#1740ff', 0.31);
            break;
            case 5:
                materialFound = new Material(5, 'Plástico', 'Icones_materiais-plastico.png', 
                    '#CF1313', 0.99);
            break;
            case 6:
                materialFound = new Material(6, 'Metal', 'Icones_materiais-metal.png', 
                    '#e78b00', 0.32);
            break;
            case 7:
                materialFound = new Material(7, 'Óleo', 'Icones_materiais-oleo.png', 
                    '#895a34', 0.06);
            break;
            case 8:
                materialFound = new Material(8, 'Eletrônicos', 'Icones_materiais-eletronico.png', 
                    '#7244e7', 1.32);
            break;
            case 9:
                materialFound = new Material(9, 'Bateria', 'Icones_materiais-bateria.png', 
                    '#8f852b', 0.90);
            break;
            case 10:
                materialFound = new Material(10, 'Móveis', 'Icones_materiais-moveis.png', 
                    '#64b3e4', 0.68);
            break;
            case 11:
                materialFound = new Material(11, 'Entulho', 'Icones_materiais-entulho.png', 
                    '#b1b1b1', 0.02);
            break;
            case 12:
                materialFound = new Material(12, 'Outros', 'Icones_materiais-poda.png', 
                    '#595959', 0.01);
            break;
        }

        return materialFound;
    }
}