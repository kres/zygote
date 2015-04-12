//arduino code for rgb led; goes with wifi-rgb.py
int redPin = 11;
int greenPin = 10;
int bluePin = 9;
int rgb_arr[3];

//using a Common Anode LED
#define COMMON_ANODE

void setup()
{
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT); 
  Serial.begin(9600); 
}

void loop()
{
  int i = 0;
  
  //read the rgb value bytes
  while(1){
    if(Serial.available() > 0){
      rgb_arr[i] = Serial.read();
      Serial.println(rgb_arr[i]);
      i++;
    }
    if(i == 3){
     i = 0; //is  this reqd.?
     break;
    }
  }
  
  //set to the values read
  setColor(rgb_arr[0], rgb_arr[1], rgb_arr[2]);
}

void setColor(int red, int green, int blue)
{
  #ifdef COMMON_ANODE
    red = 255 - red;
    green = 255 - green;
    blue = 255 - blue;
  #endif
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);  
}
