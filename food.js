class Food
{
    constructor(){
        
        this.foodStock = 20;
        this.image = loadImage("Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }
 
    deductFood(){
        if(this.foodStock>0){
        this.foodStock = this.foodStock -1;
        }
    }
 
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    display(){
        var x= 80, y=100;

        imageMode();
        image(this.image, 120, 220, 70,70);

       if(this.foodStock != 0){
           for(var i=0; i<this.foodStock; i++){
               if(i%10){
                   x= 80;
                   y = y+50
               }
               image(this.image,x,y,50,50);
               x= x+30;
           }
       }
    }
}