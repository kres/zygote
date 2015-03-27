#!/usr/bin/env python

#This is an example of an event generation node

# Output format over TCP :
#	{value : "ring"} => sent when someone rings
#	probably can be extended later on for double ring, etc

# PORT : 8892

import socket
import time

TCP_IP = '0.0.0.0'
TCP_PORT = 8892
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

while True:
	conn, addr = s.accept()
	print 'Connection address:', addr
	while 1:
		time.sleep(5) #every 5 seconds
		conn.send('{ "value" : "ring"}')
	conn.close()