//Temp sensor sketch that works with lm35@A0
float temp;
int tempPin = 0;

void setup(){
  Serial.begin(9600);
}

void loop(){
  if(Serial.available() > 0)
  {
    //clear the buffer - indicates request
    Serial.read();
    //read adc val
    temp = analogRead(tempPin);
    temp = temp * 0.48828125;
    Serial.println(temp);
  }
}
