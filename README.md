zygote
======

Zygote is a physical-web framework, for the internet of things. It is a perfect fusion of hardware and the web, enabling IoT developers to access hardware through Javascript libraries and RESTful APIs. The platform, portable and light weight can run on any piece of hardware which has a python based IO library (such as [PyBBIO][1] for the [Beaglebone Black] [2] or [RPi.GPIO][3] for the [Raspberry Pi][4]). The key purpose of the project is to get the hardware resources on to the web, thus being an essential tool in the IoT environment.

[1]: http://github.com/alexanderhiam/PyBBIO
[2]: http://beagleboard.org/black
[3]: https://pypi.python.org/pypi/RPi.GPIO
[4]: http://www.raspberrypi.org/

##Why the name?
[Zygote][5], in biological terms, is the entity derived by the perfect fusion of two complementry beings, in this case the hardware and the web.

[5]: http://en.wikipedia.org/wiki/Zygote


##The REST interface
###1. GPIO
```
GET /gpio/pin_name
  get the value the specified pin (either Input or Output mode)
  
PUT /gpio/pin_name?mode=output
  configure the specified pin (mode = input or output)
  
POST /gpio/pin_name "status=1"
  status=1; sets pin to high
  status=0; sets pin to low
  can only be used when pin configured as output.
  
pin_name => GPIO0_1, GPIO1_22, USR1 etc.
```
###2. PWM
```
PUT /pwm/pin_name?enable=true
  to initialize the pwm. enable=false, to disable the pwm module.
  
POST /pwm/pin_name?value=50
  sets the pwm value for pin_name to 50. (min: 0, max:255)
  
pin_name = ['1A', '1B', '2A', '2B']

NOTE: there is no get request for this resource.
```

###3. Servo
```
GET /servo/pin_name
  returns the current angle of the servo motor

PUT /servo/pin_name?enable=true
  enables the servo. To disable : enable=false

POST /servo/pin_name?angle=50
  sets the angle of the servo motor to what is specified.
  
pin_name  = ['1A', '1B', '2A', '2B']
```

###4. AIN
```
GET /ain/pin_name
  returns the analog value on the pin
  
PUT /ain/pin_name?enable=true
  enables the analog input pins
  
NOTE : no post request for this resource
```

##The JavaScript API
(Still to be done - will be very similar to the arduino API)

###1. Digital IO

* ####pinMode 
  Sets the mode of the GPIO pin, to either INPUT or OUTPUT.
  ```javascript
  pinMode(pin_name, mode,[ other_params, [callback]])
  
    pin_name: name of the pin ('USR1', 'GPIO1_22' etc)
    mode : 'input' or 'output'
    other_params : a json obj. extra key value pairs 
    to be sent to server as a part of the HTTP body.
    callback : function to be called when server responds.
  ```
    **REST url** : PUT host/gpio/pin_name  "mode=\<mode>&k=v" <br>
    where \<mode> is the value of the parameter passed to this function.
    k,v are key value pairs of the other_param object
        
    **returns** 'OK'


* ####digitalWrite 
  Drive the output of the pin to either high or low.
  ```javascript
  digitalWrite(pin_name, state, [other_params, [callback]])
  
    pin_name : name of the pin
    state : 'high' or 'low'
    other_params : a json obj. extra key value pairs 
    to be sent to server as a part of the HTTP body.
    callback : function to be called when server responds.
  ```
    **REST url** : POST /host/gpio/pin_name "state=\<state>&k=v" <br>
    **returns** 'OK'
  
  
* ####digitalRead : 
  Read the input value being fed to the pin (if pin mode is input)
                  or read last written value (if pin mode is output)
  ```javascript
  digitalRead(pin_name, [other_params, [callback]])
  
    pin_name : name of the pin
    other_params : a json obj. extra key value pairs 
    to be sent to server as a part of the HTTP body.
    callback : function to be called when server responds.
  ```
    **REST url** : GET /host/gpio/pin_name <br>
    **returns** '1' if high, '0' if low
  
  
##Architecture overview
![](https://raw.githubusercontent.com/wiki/kres/zygote/zygote-architecture.png)
