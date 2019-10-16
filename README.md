Project Zygote
==============
The visual Internet of Things framework powered by Node.js, Express, D3 and jsPlumb.

## What
Project Zygote is an end to end IoT framework which enables developers, makers and hobbyists to rapidly prototype and deploy their IoT application. Makers and hackers should be able to seamlessly interconnect hardware resources (sensors, actuators) between themselves or to software components (graphs, gauges, etc.). The framework is platform neutral, meaning you can run it on the Beaglebone Black, the Raspberry Pi or any hardware that runs Node.js (maybe even tessel!). Everything is accessible and configurable through the browser, no complex installations. 

## Why
Interconnecting things is **hard**. It takes knowledge of underlying hardware, working of sensors, installing tools, knowing programming, connecting the 'thing' to the internet etc. It makes it even worse when people want to visualize the data or give visual input. Project Zygote simplifies all these tasks by providing a DRY (Do not repeat yourself) framework. 

# Features
The framework will support fully graphics based logic generation across various sensor nodes.
As of now the sensor nodes are Wifi based, but soon will support popular protocols such as BLE, Zigbee, Z-wave etc.

 **Among nodes**
 
 
 *Hardware*
>   * Ultrasonic sensor
>   * RGB LED
>   * Temperature sensor
>   * Light sensor
>   * GPIO
>   * PWM/Servo

*Software Widgets*
>   * Gauge
>   * Sparkline 
>   * RGB Color picker
>   * Toggle button
 

# How

There are four components to the project
  * **Zygote Server**
  
    This acts as the router for exchange of data and events between hardware endpoints (Zygote Embed instances) and software endpoints (Dashboard). This is basically the interconnect fabric.

  * **Zygote Embed**
  
    This is the Node.js software that runs on the end hardware. It grabs the spec file from the hardware and send it to the server. Then it establishes a Websocket connection to the server. This enables two way transfer of data, events and commands.

  * **Zygote Flowboard**
  
    This is the authoring interface used to create resources and create logical flows between them. Flows can be event triggered or interval based. 

  * **Zygote Dashboard**
  
    This is the data visualization and control tool which enables developers to collect data graphically and to control actuators.
    
### Working of zygote in six steps : [here](https://goo.gl/Z1VSN7)

### High level architecture

![zygote-arch](https://cloud.githubusercontent.com/assets/3639811/20110455/71570616-a60a-11e6-8c4f-bf7e02f81d0c.png)

* More details can be found in this presentation [here](https://goo.gl/CjXvXc).
* For even more detail, please refer our [paper](http://ieeexplore.ieee.org/document/7529813/), or the [pre-published version](https://drive.google.com/file/d/0B8Pib9n32qUvVEtkZlpGN21Mckk/view?usp=sharing) (for free)

---------

# Demo UI
### Flow to vizualize temperature sensor values
![temp1](https://cloud.githubusercontent.com/assets/3639811/7278090/0ea8a20a-e931-11e4-9516-f372c349fced.png)

### Visulization of data (result of flow)
![temp](https://cloud.githubusercontent.com/assets/3639811/7278081/089775f8-e931-11e4-9c50-61c19b1c99b2.png)

## How to use
* Start the server in the Zygote-Server folder by typing 
  > $node server.js
  
 int the command line. This will start the server on the system's IP address on port 3000
* Get the Beagleboard online, there go to zygote-embed and type 
 
  > $node main.js \<name-of-node\>:bbb   \<ip-addr\>:\<port\>
 
  The name-of-node choice is yours, 'bbb' indicates the board type, 'ip-addr' and 'port' is the address and port of the server respectively.
* Open the Flowboard and Dashboard in your browser (it is being served by zygote-server). You should be able to create widgets on the dashboard and see them as resources in the flowboard. You can now start developing your IoT app.


# What it  does
The framework is more than merely visual programming, in fact visual authoring is not even one of the core features!!

Lets start off with what is expected of a IoT framework that is meant to support any generic IoT application -
* If I have two IoT based devices, they should be able to talk to each other seamlessly - irrespective of protocol each device uses.
* Each sensor attached to the device running the framework, should be available across the internet via the cloud, preferably via a REST API. eg. ```GET api/board/temp/1``` will return the temperature data as a JSON object.
* The developer should be able to execute a flow of instructions on an occurrence of a certain event, i.e. set event triggers.
* The framework should enable the developer to create flows between an input and output device. eg. The output of a humidity sensor should be able to be made the input to a visualization element such as a graph plot.
* The developer should be able to dynamically reconfigure the IoT system without any downtime. 
* The framework should enable programmatic control of the sensors and actuators connected to it (other than the REST API), and execute the code while the system is running.
* A generic resource abstraction, i.e. each sensor/actuator should have a generic way of of being accessed so as to make it simpler to use.
* Platform agnostic, the framework should provide hardware specific drivers so that the external interface works in the same manner whether the system is running on a Beaglebone Black or an Intel Edison.
* Cross node access of sensor and actuator data must be seamless. i.e. one node running the framework (and connected to the cloud) should be able to coordinate with sister nodes (connected to the cloud), and access the remote resources on the other node.

The zygote platform enables **all** the above mentioned features!!

Project zygote was presented at [IEEE ADCOM 2015](http://accsindia.org/category/adcom/), the slide deck is available [online](https://raw.githubusercontent.com/wiki/kres/zygote/Zygote-ADCOM.pdf)

Please note that there are a few typos in the slides which I corrected before the presentation, but have not updated the slide set here. (slide 8, first para is incomplete)
