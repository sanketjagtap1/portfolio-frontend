import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var Quill: any;

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="rich-text-editor">
      <div #editorElement class="bg-slate-700 border border-gray-600 rounded-lg overflow-hidden"></div>
      <!-- Fallback textarea if Quill doesn't load -->
      <div *ngIf="!quillLoaded" class="mt-2">
        <textarea 
          [(ngModel)]="fallbackContent"
          (ngModelChange)="onFallbackChange($event)"
          [placeholder]="placeholder"
          class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
          rows="6"
        ></textarea>
        <p class="text-xs text-orange-300 mt-1">Rich text editor loading... Using fallback textarea.</p>
      </div>
    </div>
  `,
  styles: [`
    .rich-text-editor {
      width: 100%;
    }
    
    .rich-text-editor .ql-editor {
      min-height: 200px;
      font-size: 14px;
      line-height: 1.6;
      color: #ffffff !important; /* White text */
      background-color: #334155 !important; /* Slate-700 background to match form */
    }
    
    /* Force text color for all content */
    .rich-text-editor .ql-editor * {
      color: #ffffff !important;
    }
    
    .rich-text-editor .ql-editor p {
      color: #ffffff !important;
    }
    
    .rich-text-editor .ql-editor div {
      color: #ffffff !important;
    }
    
    .rich-text-editor .ql-editor span {
      color: #ffffff !important;
    }
    
    .rich-text-editor .ql-toolbar {
      border-top: 1px solid #475569;
      border-left: 1px solid #475569;
      border-right: 1px solid #475569;
      border-bottom: none;
      background-color: #475569 !important; /* Slate-600 toolbar */
    }
    
    .rich-text-editor .ql-container {
      border-bottom: 1px solid #475569;
      border-left: 1px solid #475569;
      border-right: 1px solid #475569;
      border-top: none;
      background-color: #334155 !important; /* Slate-700 background */
    }
    
    .rich-text-editor .ql-editor.ql-blank::before {
      color: #94a3b8 !important; /* Slate-400 placeholder text */
      font-style: normal;
    }
    
    /* Toolbar button styling */
    .rich-text-editor .ql-toolbar .ql-stroke {
      stroke: #cbd5e1 !important; /* Slate-300 icons */
    }
    
    .rich-text-editor .ql-toolbar .ql-fill {
      fill: #cbd5e1 !important; /* Slate-300 icons */
    }
    
    .rich-text-editor .ql-toolbar button {
      color: #cbd5e1 !important; /* Slate-300 text */
    }
    
    .rich-text-editor .ql-toolbar button:hover {
      background-color: #64748b !important; /* Slate-500 hover */
    }
    
    .rich-text-editor .ql-toolbar button.ql-active {
      background-color: #ea580c !important; /* Orange-600 active state to match form theme */
      color: #ffffff !important;
    }
    
    /* Custom styles for better formatting */
    .rich-text-editor .ql-editor ul {
      padding-left: 1.5rem;
    }
    
    .rich-text-editor .ql-editor ol {
      padding-left: 1.5rem;
    }
    
    .rich-text-editor .ql-editor li {
      margin-bottom: 0.25rem;
    }
    
    .rich-text-editor .ql-editor p {
      margin-bottom: 0.75rem;
    }
    
    .rich-text-editor .ql-editor h1,
    .rich-text-editor .ql-editor h2,
    .rich-text-editor .ql-editor h3 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #1f2937 !important;
    }
    
    .rich-text-editor .ql-editor blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #6b7280;
    }
    
    .rich-text-editor .ql-editor strong {
      color: #1f2937 !important;
    }
    
    .rich-text-editor .ql-editor em {
      color: #1f2937 !important;
    }
    
    /* Dropdown styling */
    .rich-text-editor .ql-toolbar .ql-picker {
      color: #cbd5e1 !important; /* Slate-300 */
    }
    
    .rich-text-editor .ql-toolbar .ql-picker-options {
      background-color: #475569 !important; /* Slate-600 */
      border: 1px solid #64748b !important; /* Slate-500 */
      color: #cbd5e1 !important; /* Slate-300 */
    }
    
    .rich-text-editor .ql-toolbar .ql-picker-item {
      color: #cbd5e1 !important; /* Slate-300 */
    }
    
    .rich-text-editor .ql-toolbar .ql-picker-item:hover {
      background-color: #64748b !important; /* Slate-500 */
    }
    
    .rich-text-editor .ql-toolbar .ql-picker-item.ql-selected {
      background-color: #ea580c !important; /* Orange-600 */
      color: #ffffff !important;
    }
    
    /* Global override for Quill editor content */
    .rich-text-editor .ql-editor {
      color: #ffffff !important;
      background-color: #334155 !important;
    }
    
    .rich-text-editor .ql-editor p,
    .rich-text-editor .ql-editor div,
    .rich-text-editor .ql-editor span,
    .rich-text-editor .ql-editor h1,
    .rich-text-editor .ql-editor h2,
    .rich-text-editor .ql-editor h3,
    .rich-text-editor .ql-editor h4,
    .rich-text-editor .ql-editor h5,
    .rich-text-editor .ql-editor h6,
    .rich-text-editor .ql-editor li,
    .rich-text-editor .ql-editor ul,
    .rich-text-editor .ql-editor ol {
      color: #ffffff !important;
    }
    
    /* Override any inline styles that might be set by Quill */
    .rich-text-editor .ql-editor [style*="color"] {
      color: #ffffff !important;
    }
    
    /* Color picker styling */
    .rich-text-editor .ql-toolbar .ql-color-picker,
    .rich-text-editor .ql-toolbar .ql-background {
      background-color: #475569 !important;
    }
    
    /* Link input styling */
    .rich-text-editor .ql-toolbar .ql-link input {
      background-color: #334155 !important;
      color: #ffffff !important;
      border: 1px solid #64748b !important;
    }
  `]
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() placeholder: string = 'Enter your content here...';
  @Output() contentChange = new EventEmitter<string>();
  
  @ViewChild('editorElement', { static: true }) editorElement!: ElementRef;
  
  private quill: any;
  quillLoaded = false;
  fallbackContent = '';
  
  ngOnInit() {
    this.fallbackContent = this.content;
    this.initializeQuill();
  }
  
  ngOnDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  }
  
  private initializeQuill() {
    // Wait for Quill to be available
    if (typeof Quill === 'undefined') {
      console.log('Quill not loaded yet, retrying...');
      setTimeout(() => this.initializeQuill(), 100);
      return;
    }
    
    console.log('Initializing Quill editor...');
    
    this.quill = new Quill(this.editorElement.nativeElement, {
      theme: 'snow',
      placeholder: this.placeholder,
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          ['blockquote', 'code-block'],
          [{ 'color': [] }, { 'background': [] }],
          ['link'],
          ['clean']
        ]
      }
    });
    
    console.log('Quill editor initialized');
    this.quillLoaded = true;
    
    // Force text color after initialization
    setTimeout(() => {
      this.forceTextColor();
    }, 100);
    
    // Set initial content
    if (this.content) {
      this.quill.root.innerHTML = this.content;
    }
    
    // Listen for content changes
    this.quill.on('text-change', () => {
      const html = this.quill.root.innerHTML;
      this.contentChange.emit(html);
      // Force text color after content changes
      setTimeout(() => {
        this.forceTextColor();
      }, 10);
    });
  }
  
  private forceTextColor() {
    if (this.quill && this.quill.root) {
      // Force white text color on all elements for dark theme
      const editor = this.quill.root;
      const allElements = editor.querySelectorAll('*');
      allElements.forEach((element: HTMLElement) => {
        element.style.color = '#ffffff';
      });
      
      // Also set on the root editor
      editor.style.color = '#ffffff';
      editor.style.backgroundColor = '#334155';
    }
  }
  
  onFallbackChange(value: string) {
    this.fallbackContent = value;
    this.contentChange.emit(value);
  }
  
  setContent(content: string) {
    if (this.quill) {
      this.quill.root.innerHTML = content;
    }
  }
  
  getContent(): string {
    return this.quill ? this.quill.root.innerHTML : '';
  }
}
