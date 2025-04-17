// import { Component } from '@angular/core';
// import {FormsModule} from '@angular/forms';
// import { CommonModule} from '@angular/common';
// import {OpenAIService} from '@/app/chatGPT/service/openai.service';
//
// @Component({
//   selector: 'app-ki-chat',
//   imports: [
//     CommonModule, FormsModule
//   ],
//   templateUrl: './ki-chat.component.html',
//   styleUrl: './ki-chat.component.css'
// })
// export class KiChatComponent {
//   userInput = '';
//   response = '';
//
//   constructor(private openai: OpenAIService) {}
//
//   send() {
//     if (!this.userInput.trim()) return;
//
//     this.openai.sendMessage(this.userInput).subscribe((res) => {
//       this.response = res.choices[0].message.content;
//       for (let i = 1; i < res.choices.length; i++) {
//         console.log(res.choices[i]);
//       }
//     });
//
//     this.userInput = '';
//   }
// }
