import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'material-slider',
  templateUrl: 'material-slider.html',
})
export class MaterialSlider {

 @ViewChild(Slides) slides: Slides;

 
  slideNum:number;
  sliders:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController,platform: Platform) {



  this.sliders = [
    {
      icon: './assets/img/material_sliderIcon_1.png',
      name: 'Papel',
      list : [
          '- 100% reciclável e biodegradável;' ,        
          '- Reciclamos 1/3 do produzido;',
          '- tonelada reciclada poupa 22 árvores;', //
          '- Evite molhar, rasgar ou amassar;',
          '- Não misture papel engordurado;',
          '- Lave embalagens longa vida no enxágue da louça.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_2.png',
      name: 'Alumínio',
      list : [
          '- Em 60 dias, 1 lata é produzida, comprada, coletada, reciclada e volta as prateleiras;' ,        
          '- Reciclamos 98.4% das latinhas do Brasil. E apenas 33% dos outros itens de alumínio;',
          '- Reciclar gasta 95% menos energia do que produzir.',
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_3.png',
      name: 'Plásticos',
      list : [
          '- O Brasil só recicla 20% da produção;' ,        
          '- 8 bilhões de kg/ano poluem os oceanos;',
          '- Recicle sacolas, salgadinhos, sachês, canudos, isopor e todos os outros plásticos;',
          '- Limpe restos de alimento com água do enxague da louça ou guardanapo usado.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_4.png',
      name: 'Vidros',
      list : [
          '- 100% reciclável, e dura para sempre;' ,        
          '- Preço baixo, poucos lugares reciclam;',
          '- Vidro quebrado é ainda pior;',
          '- Maior número de acidentes com catadores;',
          '- Lâmpadas, TV, térmicas e espelhos precisam de atenção especial, combine;',
          '- Maior número de acidentes com catadores.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_5.png',
      name: 'Óleo',
      list : [
          '- 1L no ralo = 25 mil L de água poluída;' ,        
          '- Nunca descarte na pia ou no vaso;',
          '- Depois de usado e esfriado, o óleo deve ser coado numa garrafa PET com tampa;',
          '- Peça ao catador para levar a um ponto de coleta ou cooperativa que produz sabão.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_6.png',
      name: 'Resíduos Misturados',
      list : [
          '- É o pior material para os catadores, seu valor é muito baixo;' ,        
          '- O Brasil perde R$ 8 bilhões/ano enterrando recicláveis misturados;',
          '- Remédios e suas embalagens laminadas devem ser descartados nas farmácias.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_7.png',
      name: 'Metal',
      list : [
          '- Aço é o material mais reciclado do mundo: é 100% reciclável, infinitas vezes;' ,        
          '- 1/4 do aço no Brasil utiliza matéria reciclada;',
          '- Metais reciclados estão em latas de alimentos, ferramentas, arames, vigas, automóveis e utensílios domésticos.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_8.png',
      name: 'Eletrônicos',
      list : [
          '- 98% dos componentes de um eletrônico podem ser reciclados;' ,        
          '- Tem valor mais alto, mas só 15.5% é reciclado: falta infraestrutura no Brasil;',
          '- São altamente contaminantes : busque a destinação correta.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_9.png',
      name: 'Baterias',
      list : [
          '- São altamente contaminantes;' ,        
          '- Estão nos celulares, telefones sem fio, máquinas fotográficas, filmadoras, laptops, brinquedos e relógios.',
          '- Não podem ser misturadas : separe e avise o catador antes da coleta.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_10.png',
      name: 'Móveis',
      list : [
          '- Cheque o tamanho da carroça;' ,        
          '- Combine com o catador o ponto de descarte dos móveis;',
          '- Ideal: reciclagem de móveis;',
          '- Garanta que o móvel não terminará em um terreno baldio ou na rua.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_11.png',
      name: 'Entulho',
      list : [
          '- Pode-se aproveitar 95% do material e sua reciclagem é obrigatória;' ,        
          '- Reutilizado em ruas e estradas;',
          '- Garanta que seu entulho não acabará em um terreno baldio: cheque com sua Prefeitura o local adequado.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_12.png',
      name: 'Outros',
      list : [
          '- Podas de árvore podem ser compostadas e produzir energia;' ,        
          '- Em eventos e festas, organize a separação dos recicláveis secos em sacos grandes;',
          '- Avalie e combine com o catador a coleta dos resíduos não listados neste aplicativo.'
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_13.png',
      name: 'Poda',
      list : [
          /*'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor eros, tempor sed fringilla id, iaculis et orci. Nullam lorem orci, iaculis at odio in, porta pulvinar risus.'*/
      ],
      desc: 'Combine com o catador qual é a remuneração adequada para cada coleta.',
      subdesc : 'Resíduos misturados tem um valor médio de venda de'
    }
  ];


      console.log(navParams.get('data'));
      this.slideNum = navParams.get('data');
      
      setTimeout(()=>{
        console.log("Hello2");
        this.slides.slideTo(this.slideNum, 0, true);
      },600);
      
  }

  ngOnInit(){


   
      
  }
 
goToLeft(index) {
  
    this.slides.slidePrev(500, true)
    console.log(index);
};
goToRight(index) {
    this.slides.slideNext(500, true)
    console.log(index);
  };




}
