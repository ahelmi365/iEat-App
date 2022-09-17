export class menuItem{
  id:number;
  name:string;
  price:number;
  url:string;
  description:string;
  itemQuantity:Number;
  category:[];

  constructor(){
      this.id = 0;
      this.name="";
      this.price=0;
      this.url="";
      this.description="";
      this.itemQuantity=0;
      this.category=[];

  }
}
