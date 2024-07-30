import { Component, OnInit } from '@angular/core';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { environment } from './../../environments/environment';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookies-chat',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './cookies-chat.component.html',
  styleUrl: './cookies-chat.component.css'
})
export class CookiesChatComponent implements OnInit {
  loading = false;
  chatHistory: { parts: string, role: string }[] = [{ parts: '', role: '' }];
  message = 'You are an expert AI cookie baking model. I want to bake cookies. Can you help me with a recipe?';
  API_KEY = environment.API_KEY;
  MODEL_NAME = 'gemini-1.5-flash';

  private genAI: GoogleGenerativeAI;
  private model;
  private chat;

  constructor() {
    this.genAI = new GoogleGenerativeAI(this.API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: this.MODEL_NAME,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain'
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
      ]
    });
    this.chat = this.model.startChat({ history: [] });
  }

  ngOnInit(): void {
  }

  addMessageToHistory(role: string, message: string): void {
    this.chatHistory = [...this.chatHistory, { parts: message, role }];
  }

  async fetchData(): Promise<void> {
    this.loading = true;
    this.addMessageToHistory('user', this.message);
    const result = await this.chat.sendMessage(this.message);
    const response = result.response.text()
      .replace(/\*\*/g, '<b>')
      .replace(/\*/g, '<li>')
      .replace(/\_/g, '<i>')
      .replace(/\n/g, '<br>');
    this.addMessageToHistory('model', response);
    this.message = '';
    this.loading = false;
  }

  handleSubmit(): void {
    this.fetchData();
  }

  handleSetMessage(event: any): void {
    this.message = event.target.value;
  }
}
