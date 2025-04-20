import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { stringify } from 'querystring';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  models = ['Logistic Regression', 'Random Forest', 'LSTM', 'BiLSTM'];
  selectedModel = this.models[0];
  title = '';
  content = '';
  result: string | null = null;
  accuracy: number = 0;

  constructor(private httpClient: HttpClient){}

  selectModel(model: string) {
    this.selectedModel = model;
  }

  async kiemTraTin() {
    var predict;
    switch(this.selectedModel){
      case this.models[0]:
        predict = await this.getLG(this.title, this.content);
        break;
      case this.models[1]:
        predict = await this.getRF(this.title, this.content);
        break;
      case this.models[2]:
        predict = await this.getLSTM(this.title, this.content);
        break;
      case this.models[3]:
        predict = await this.getBiLSTM(this.title, this.content);
        break;
    }
    this.accuracy = Number.parseFloat((predict.accuracy * 100).toFixed(2));
    this.result = predict.label === 1 ? 'Tin thật' : 'Tin giả';
    const modalEl = document.getElementById('resultModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  hasAccuracy(): boolean {
    return this.selectedModel === 'LSTM' || this.selectedModel === 'BiLSTM';
  }

  private getLG(title: string, content: string) : any{
    var url = "http://127.0.0.1:8080/logistic-predict";
    var body = JSON.stringify({
      title: title,
      content: content,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(this.httpClient.post(url, body, {headers : headers}));
  }

  private getRF(title: string, content: string) : any{
    var url = "http://127.0.0.1:8080/random-forest-predict";
    var body = JSON.stringify({
      title: title,
      content: content,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(this.httpClient.post(url, body, {headers : headers}));
  }
  
  private getLSTM(title: string, content: string) : any{
    var url = "http://127.0.0.1:8080/lstm-predict";
    var body = JSON.stringify({
      title: title,
      content: content,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(this.httpClient.post(url, body, {headers : headers}));
  }

  private getBiLSTM(title: string, content: string) : any{
    var url = "http://127.0.0.1:8080/bilstm-predict";
    var body = JSON.stringify({
      title: title,
      content: content,
    });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return lastValueFrom(this.httpClient.post(url, body, {headers : headers}));
  }
}
