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
          '- 100% reciclavel e biodegradavel;' ,        
          '- Reciclamos 1/3 do produzido;',
          '- tonelada reciclada poupa 22 arvores;',
          '- Evite molhar, rasgar ou amassar;',
          '- Nao misture papel engordurado;',
          '- Lave embalagens longa vida no enxague da louca.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_2.png',
      name: 'Aluminio',
      list : [
          '- Em 60 dias, 1 late e produzida, comprada, coletada, reciclada e volta as prateleiras;' ,        
          '- Reciclamos 98.4% das latinhas do Brasil. E apenas 33% dos outros itens de aluminio;',
          '- Reciclar gasta 95% menos energia do que produzir.',
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_3.png',
      name: 'Plasticos',
      list : [
          '- O Brasil so recicla 20% da producao;' ,        
          '- 8 bilhoes de kg/ano poluem os oceanos;',
          '- Recicle sacolas, salgadinhos, saches, canudos, isopor e todos os outros plasticos;',
          '- Limpe restos de alimento com ague do enxague da louca ou guardanapo usado.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_4.png',
      name: 'Vidros',
      list : [
          '- 100% reciclavel, e dura para sempre;' ,        
          '- Preco baixo, poucos lugares reciclam;',
          '- Vidro quebrado e ainda pior;',
          '- Maior numero de acidentes com catadores;',
          '- Lampadas, TV, termicas e espelhos precisam de atencao especial, combine;',
          '- Maior numero de acidentes com catadores.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_5.png',
      name: 'Oleo',
      list : [
          '- 1L no ralo = 25 mil L de agua poluida;' ,        
          '- Nunca descarte na pia ou no vaso;',
          '- Depois de usado e esfriado, o oleo deveser coado num garrafa PET com tampa;',
          '- Peca ao catador para levar a um ponto de coleta ou cooperativa que produz sabao.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_6.png',
      name: 'Residuos Misturados',
      list : [
          '- E o pior material para os catadores, seu valor e muito baixo;' ,        
          '- O Brasil perde R$ 8 bilhoes/ano enterrando reciclaveis misturados;',
          '- Remedios e suas embalagens laminadas devem ser descartados nas farmacias.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_7.png',
      name: 'Metal',
      list : [
          '- Aco e o material mais reciclado do mundo: e 100% reciclavel, infinitas vezes;' ,        
          '- 1/4 do aco no Brasil utiliza materia reciclada;',
          '- Metais reciclados estao em latas de alimentos, ferramentas, arames, vigas, automoveis e utensilios domesticos.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_8.png',
      name: 'Eletronicos',
      list : [
          '- 98% dos componentes de um eletronico podem ser reciclados;' ,        
          '- Tem valor mais alto, mas so 15.5% e reciclado: falta infraestrutura no Brasil;',
          '- Sao altamente contaminantes : busque a destinacao correta.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_9.png',
      name: 'Baterias',
      list : [
          '- Sao altamente contaminantes;' ,        
          '- Estao nos celulares, telefones sem fio, maquinas fotograficas, filmadoras, laptops, brinquedos e relogios.',
          '- Nao podem ser misturadas : separe e avise o catador antes da coleta.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : '' 
    },
    {
      icon: './assets/img/material_sliderIcon_10.png',
      name: 'Moveis',
      list : [
          '- Cheque o tamanho da carroca;' ,        
          '- Combine com o catador o ponto de descarte dos moveis;',
          '- Ideal: reciclagem de moveis;',
          '- Garanta que o movel nao terminara em um terreno baldio ou na rua.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_11.png',
      name: 'Entulho',
      list : [
          '- Pode-se aproveitar 95% do material e sue reciclagem e obrigatoria;' ,        
          '- Reutilizado em ruas e estradas;',
          '- Garanta que seu entulho nao acabara em um terreno baldio: cheque com sua Prefeitura o local adequado.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_12.png',
      name: 'Outros',
      list : [
          '- Podas de arvore podem ser compostadas e produzir energia;' ,        
          '- Em eventos e festas, organize a separacao dos reciclaveis secos em sacos grandes;',
          '- Avalie e combine com o catador a coleta dos residuos nao listados neste aplicativo.'
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : ''
    },
    {
      icon: './assets/img/material_sliderIcon_13.png',
      name: 'Poda',
      list : [
          /*'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tortor eros, tempor sed fringilla id, iaculis et orci. Nullam lorem orci, iaculis at odio in, porta pulvinar risus.'*/
      ],
      desc: 'Combine com o catador qual e a remuneracao adequada para cada coleta.',
      subdesc : 'Residuos misturados tem um valor medio de venda de'
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
