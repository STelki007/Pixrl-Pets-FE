import {Component, OnInit} from '@angular/core';
import {MainViewComponent} from '@components/games/uno/main-view/main-view.component';

@Component({
  selector: 'app-uno',
  imports: [
    MainViewComponent
  ],
  templateUrl: './uno.component.html',
  styleUrl: './uno.component.css'
})
export class UnoComponent implements OnInit {
  ngOnInit() {
  //   this.http.post('http://localhost:3000/api/chat', {
  //     message: 'Hallo, ChatGPT!' // Die Nachricht, die du an ChatGPT senden willst
  //   }).subscribe(response => {
  //     console.log(response); // Antwort von OpenAI
  //   });
  }
}
