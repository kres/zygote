//read the light sensor and display to serial console

int sensorPin = 0;    // select the input pin for the potentiometer
int sensorValue = 0;  // variable to store the value coming from the sensor

void setup() {
  // declare the ledPin as 
  Serial.begin(9600);
}

void loop() {
  // read the value from the sensor:
  if(Serial.available() > 0)
  {
    //clear the buffer - indicates request
    Serial.read();
    //get the sensor value
    sensorValue = analogRead(sensorPin);
    //map it
    sensorValue = map(sensorValue, 0, 1023, 0, 255);  
    //write it to port
    Serial.println(sensorValue);
  }                
}
