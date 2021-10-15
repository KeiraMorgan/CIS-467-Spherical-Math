import { SEExpression } from "./SEExpression";
import { ObjectState } from "@/types";
import i18n from "@/i18n";

const emptySet = new Set<string>();
export class SESlider extends SEExpression /*implements Visitable*/ {
  /* Access to the store to retrieve the canvas size so that the bounding rectangle for the text can be computed properly*/
  // protected store = AppStore;

  readonly min: number;
  readonly max: number;
  private current: number;
  readonly step: number;
  private playAndStopFlag: boolean;
  private loopFlag: boolean;
  private reflectFlag: boolean;
  private reflectDirection: boolean;
  private timerExists: boolean;
  private playAgain: boolean;
  private timerID!: NodeJS.Timeout;
  private playSpeed: number;
  constructor({
    min,
    max,
    step,
    value,
  }: {
    min: number;
    max: number;
    step: number;
    value: number;
  }) {
    super(); // this.name is set to a measurement token M### in the super constructor
    this.min = min;
    this.max = max;
    this.step = step;
    this.current = value;
    this.playAndStopFlag = true;
    this.loopFlag = false;
    this.reflectFlag = false;
    this.reflectDirection = false;
    this.timerExists = false;
    this.playAgain = false;
    this.playSpeed = 1000;


    this.showing = true;
  }

  get value(): number {
    return this.current;
  }
  set value(v: number) {
    this.current = v;
    this.markKidsOutOfDate();
    this.updateKids();
  }

  public get noduleDescription(): string {
    return String(i18n.t(`objectTree.slider`));
  }

  public get noduleItemText(): string {
    return String(
      i18n.t(`objectTree.sliderValue`, {
        token: this.name,
        val: this.prettyValue
      })
    );
  }

  public setPlayBackType (type: string): void {
    if (type == 'Stop'){
      this.playAndStopFlag = true;
      this.loopFlag = false;
      this.reflectFlag = false;
    }
    else if (type == 'Reflect'){
      this.playAndStopFlag = false;
      this.loopFlag = false;
      this.reflectFlag = true;
    }
    else if (type == 'Loop') {
      this.playAndStopFlag = false;
      this.loopFlag = true;
      this.reflectFlag = false;
    }
  }

  //Sets the delay for setInterval in timer. If a timer already exists, 
  //it is called once to remove it then again to start with the new delay.
  public setPlayBackSpeed (speed: string): void {
    if(speed == "Slow"){
      this.playSpeed = 1250;
    }
    else if(speed == "Medium"){
      this.playSpeed = 750;
    }
    else if(speed == "Fast"){
      this.playSpeed = 250;
    }
    if(this.timerExists){
      this.timer();
      this.timer();
    }
  }

  //If the slider reaches the max value, the timer is removed.
  //The play again flag allows the slider to play from the beginning if it already reached the end.
  private playAndStop (): void {
    if(this.playAgain){
      this.value = this.min;
      this.playAgain = false;
    }
    if (this.value + this.step <= this.max){
      this.value = this.value + this.step;
    } else {
      this.timer();
      this.playAgain = true;
    }
  }

  private loop (): void {
    if (this.value + this.step > this.max){
      this.value = this.min;
    }
    else {
      this.value = this.value + this.step;
    }
  }

  private reflect (): void {
    if(!this.reflectDirection){
      if(this.value + this.step > this.max){
        this.reflectDirection = true;
      }
      else{
        this.value = this.value + this.step;
      }
    }
    if(this.reflectDirection) {
      if(this.value - this.step < this.min){
        this.reflectDirection = false;
      }
      else {
        this.value = this.value - this.step;
      }
    }
  }
  public timer (): void {
    if (!this.timerExists){
      this.timerID = setInterval(() => this.play(), this.playSpeed);
      this.timerExists = true;
    }
    else{
      clearInterval(this.timerID);
      this.timerExists = false;
    }
    
  }


  public play (): void {
    if (this.playAndStopFlag){
      this.playAndStop();
    }
    if (this.loopFlag){
      this.loop();
    }
    if(this.reflectFlag){
      this.reflect();
    }
    this.update();
  }

  public customStyles = (): Set<string> => emptySet;

  public update(
    objectState?: Map<number, ObjectState>,
    orderedSENoduleList?: number[]
  ): void {

    if (!this.canUpdateNow()) return;
    this.setOutOfDate(false);
    // SESliders always exist they are like free points, they have kids but no parents.
    //  So we store the value of the slider (because the min, max and step can't change)
    if (objectState && orderedSENoduleList) {
      orderedSENoduleList.push(this.id);
      if (objectState.has(this.id)) {
        console.log(
          `Slider with id ${this.id} has been visited twice proceed no further down this branch of the DAG.`
        );
        return;
      }
      
      objectState.set(this.id, {
        kind: "slider",
        object: this,
        sliderValue: this.value
      });
    }
    this.updateKids(objectState, orderedSENoduleList);

  }
}
