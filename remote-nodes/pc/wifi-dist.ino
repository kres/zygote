#define echoPin 9 // Echo Pin
#define trigPin 8 // Trigger Pin
#define LEDPin 13 // Onboard LED

int maximumRange = 60; // Maximum range needed
int minimumRange = 0; // Minimum range needed
int counter = 0;
int active = 0;

void setup() {
 Serial.begin (9600);
 pinMode(trigPin, OUTPUT);
 pinMode(echoPin, INPUT);
 pinMode(LEDPin, OUTPUT); // Use LED indicator (if required)
}

void loop() {
  
 long distance = getDist();
 
 int maxWait = 3;
 if (distance >= maximumRange || distance <= minimumRange){
   
   if(counter < maxWait){
     counter++;
   }
   //if no one is here for more than 3 seconds
   //switch off the LED
   if((counter == maxWait)) {
     digitalWrite(LEDPin, LOW);
     Serial.print("0");
     active = 0;
     counter++;
   }
   
 }
 else {
   if(!active){
     counter = 0;
     Serial.print("1");
     digitalWrite(LEDPin, HIGH); 
     active = 1;
   }
 }
 
 //Delay 50ms before next reading.
 delay(500);
}

long getDist(){
 long distance, duration;
 digitalWrite(trigPin, LOW); 
 delayMicroseconds(2); 

 digitalWrite(trigPin, HIGH);
 delayMicroseconds(10); 
 
 digitalWrite(trigPin, LOW);
 duration = pulseIn(echoPin, HIGH);
 
 //Calculate the distance (in cm) based on the speed of sound.
 distance = duration/58.2; 
 return distance;
}