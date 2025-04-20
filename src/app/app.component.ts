import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // 👈 thêm dòng này!

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
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

  selectModel(model: string) {
    this.selectedModel = model;
  }

  kiemTraTin() {
    // Giả lập kết quả
    const isReal = Math.random() > 0.5;
    this.result = isReal ? 'Tin thật' : 'Tin giả';

    // Giả lập độ chính xác nếu là LSTM hoặc BiLSTM
    if (this.selectedModel === 'LSTM' || this.selectedModel === 'BiLSTM') {
      this.accuracy = Math.floor(80 + Math.random() * 20);
    } else {
      this.accuracy = 0;
    }

    const modalEl = document.getElementById('resultModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  hasAccuracy(): boolean {
    return this.selectedModel === 'LSTM' || this.selectedModel === 'BiLSTM';
  }
}
