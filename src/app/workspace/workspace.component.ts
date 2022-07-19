import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RedString } from '../model/redString.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements AfterViewInit {

  isActivated: boolean = false;

  @ViewChild('boardWrap')
  boardWrap: ElementRef = {} as ElementRef;
  width: number = 0;
  height: number = 0;

  redString: RedString = { x1: 0, y1: 0, x2: 0, y2: 0 };
  
  @ViewChild('background')
  background: ElementRef = {} as ElementRef;
  backgroundCtx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  @ViewChild('noteLayer')
  noteLayer: ElementRef = {} as ElementRef;
  noteLayerCtx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  @ViewChild('stringLayer')
  stringLayer: ElementRef = {} as ElementRef;
  stringLayerCtx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  constructor() { }
  ngAfterViewInit(): void {
    this.backgroundCtx = this.background.nativeElement.getContext( '2d' );
    this.noteLayerCtx = this.noteLayer.nativeElement.getContext( '2d' );
    this.stringLayerCtx = this.stringLayer.nativeElement.getContext( '2d' );

    this.width = this.boardWrap.nativeElement.offsetWidth;
    this.height = this.boardWrap.nativeElement.offsetHeight;

    this.canvasInit();
  }

  activate(): void {
    this.isActivated = true;
  }

  onMouseMove(event: any): void {
    
    this.redString.x2 = event.x - this.boardWrap.nativeElement.getBoundingClientRect().left;
    this.redString.y2 = event.y - this.boardWrap.nativeElement.getBoundingClientRect().top; 

    this.stringLayerCtx.clearRect(0, 0, this.width, this.height);

    this.stringLayerCtx.strokeStyle = '#F24A72';
    this.stringLayerCtx.lineWidth = 3;
    this.stringLayerCtx.beginPath();
    this.stringLayerCtx.moveTo(this.redString.x1,this.redString.y1);
    this.stringLayerCtx.lineTo(this.redString.x2,this.redString.y2);
    this.stringLayerCtx.stroke();

  }
  
  onClick(event: any): void {
    console.log("pos : " + event.x, event.y);
    this.isActivated = false;
  }

  canvasInit(): void {

    this.background.nativeElement.width = this.width;
    this.background.nativeElement.height = this.height;

    this.backgroundCtx.fillStyle = '#FDAF75';
    this.backgroundCtx.rect( 0, 0, this.width, this.height );
    this.backgroundCtx.fill();

    this.noteLayer.nativeElement.width = this.width;
    this.noteLayer.nativeElement.height = this.height;

    this.noteLayerCtx.fillStyle = '#EAEA7F';
    this.noteLayerCtx.rect( 100, 100, 100, 100 );
    this.noteLayerCtx.fill();

    this.stringLayer.nativeElement.width = this.width;
    this.stringLayer.nativeElement.height = this.height;

  }

}
