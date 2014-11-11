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

```
###3. Servo
```

```

###4. AIN
```

```

##Architecture overview
![](https://raw.githubusercontent.com/wiki/kres/zygote/zygote-architecture.png)
