import { Transaction } from './../pedido.service';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';

interface Bandeiras {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {



  nome: string = '';
  bairro: string = '';
  cep: string = '';
  rua: string = '';
  numero: string = '';
  complemento: string = '';
  observacoes: string = '';

  selectedOption: string = '';

  qtdTroco: string = '';
  bandeiraCartao: string = '';
  bandeiras: Bandeiras[] = [
    {value: 'Credito', viewValue: 'Crédito'},
    {value: 'Debito', viewValue: 'Débito'},
    {value: 'Vale-refeicao', viewValue: 'Vale-refeição'},
    {value: 'Vale-alimentacao', viewValue: 'Vale-alimentação'}
  ];

  textoPedido: string = '';

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
  }

  gerarNumeroAleatorio(): number {
    const min = 10000; // Menor número de 5 dígitos
    const max = 99999; // Maior número de 5 dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  formatarCep(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    this.cep = value;
  }

  tipoPagamento():void {
    this.textoPedido = `\n*Nome:* ${this.nome}\n*Bairro:* ${this.bairro}\n*CEP:* ${this.cep}\n*Rua:* ${this.rua}\n*Número:* ${this.numero}\n*Complemento:* ${this.complemento}\n*Observações:* ${this.observacoes}`;

    if (this.selectedOption === "dinheiro") {
       this.textoPedido += `\n*Troco:* ${this.qtdTroco}\n\n`;
    }else if(this.selectedOption === "pix") {
      this.textoPedido += `\n*Pagamento pelo PIX*\n\n`;
    }else {
      this.textoPedido += `\n*Cartão:* ${this.bandeiraCartao}\n\n`;
    }

    this.concluirPedido();
  }

  concluirPedido(): void {
    const numeroAleatorio = this.gerarNumeroAleatorio();
    let numeroPedidoText = `*Número Pedido:* `+numeroAleatorio;
    let textoURI = encodeURIComponent(this.textoPedido);
    window.open(`https://api.whatsapp.com/send?phone=5511980268418&text=${numeroPedidoText}${textoURI}${this.pedidoService.pedidoURI}`);
  }
}
