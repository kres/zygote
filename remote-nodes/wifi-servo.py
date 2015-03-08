#!/usr/bin/env python
#Controls Servo using PyBBIO
# Input format over TCP :
#	"33"
# just the string value of angle

# PORT : 8890

import socket

from bbio import *
from bbio.libraries.Servo import *

TCP_IP = '0.0.0.0'
TCP_PORT = 8890
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

servo1 = Servo(PWM1A)

while True:
	conn, addr = s.accept()
	print 'Connection address:', addr
	while 1:
		data = conn.recv(BUFFER_SIZE)
		if not data: break
		print "received data:", data
		servo1.write(int(data))
		conn.send("{ value :" + data+"}")  # echo
	conn.close()
