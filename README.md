Project Zygote
==============
The visual Internet of Things framework powered by Node.js, Express, D3 and jsPlumb.

##What
Project Zygote is an end to end IoT framework which enables developers, makers and hobbyists to rapidly prototype and deploy their IoT application. Makers and hackers should be able to seamlessly interconnect hardware resources (sensors, actuators) between themselves or to software components (graphs, gauges, etc.). The framework is platform neutral, meaning you can run it on the Beaglebone Black, the Raspberry Pi or any damn thing that runs Node.js (maybe even tessel!). Everything is accessible and configurable through the browser, no complex installations. 

##Why
Interconnecting things is **hard**. It takes knowledge of underlying hardware, working of sensors, installing tools, knowing programming, connecting the 'thing' to the internet etc. It makes it even worse when people want to visualize the data or give visual input. Project Zygote simplifies all these tasks by providing a DRY (Do not repeat yourself) framework. 

#Features
The framework will support fully graphics based logic generation across various sensor nodes.
As of now the sensor nodes are Wifi based, but soon will support popular protocols such as BLE, Zigbee, Z-wave etc.

##How

There are four components to the project
  * **Zygote Server**
  
    This acts as the router for exchange of data and events between hardware endpoints (Zygote Embed instances) and software endpoints (Dashboard). This is basically the interconnect fabric.

  * **Zygote Embed**
  
    This is the Node.js software that runs on the end hardware. It grabs the spec file from the hardware and send it to the server. Then it establishes a Websocket connection to the server. This enables two way transfer of data, events and commands.

  * **Zygote Flowboard**
  
    This is the authoring interface used to create resources and create logical flows between them. Flows can be event triggered or interval based. 

  * **Zygote Dashboard**
  
    This is the data visualization and control tool which enables developers to collect data graphically and to control actuators.

##Demo UI
###Flow to vizualize temperature sensor values
![temp1](https://cloud.githubusercontent.com/assets/3639811/7278090/0ea8a20a-e931-11e4-9516-f372c349fced.png)

###Visulization of data (result of flow)
![temp](https://cloud.githubusercontent.com/assets/3639811/7278081/089775f8-e931-11e4-9c50-61c19b1c99b2.png)
