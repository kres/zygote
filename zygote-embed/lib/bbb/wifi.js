//this is the js file for the wifi service
/*
A general overview to how this works : 
	1. Developer specifies the interface to use in conf file
		(i.e.) conf.wifi.interface = "usb0" (or "eth1" etc.)

	2. When the program starts, "wifi.onLoad" of this module is called 

	3. This onLoad function reads the interface from conf file;
		and gets associated IP address of the interface
		It then sets a call back which scans the LAN of that 
		interface for newly joining nodes. callbk is set to 10sec

	4. Every time a new node is found, or a old node leaves, the 
		"wifi" service field in the spec file is updated

	5. The client browser notes this change and makes correct amends.

	6. When creating a new network/wifi sensor resource, 
		(s)he user is able to choose from a list of dropdown IP addresses

XXX : What to do if a active node leaves. How to handle such arror conditions
*/

