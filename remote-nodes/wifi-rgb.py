#Controls RGB led using PyBBIO
# Input format over TCP
#	122;23;32
# RGB values

# PORT : 8889


import socket

from bbio import *

TCP_IP = '0.0.0.0'
TCP_PORT = 8889
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

RED 	= PWM1B
GREEN 	= PWM2A
BLUE 	= PWM2B

pwmFrequency(RED, 50)
pwmFrequency(GREEN, 50)
pwmFrequency(BLUE, 50)

while True:
	conn, addr = s.accept()
	print 'Connection address:', addr
	while 1:
		data = conn.recv(BUFFER_SIZE)
		if not data: break
		print "received data:", data
		rgb = data.split(":")
		analogWrite(RED, int(rgb[0]))
		analogWrite(GREEN, int(rgb[1]))
		analogWrite(BLUE, int(rgb[2]))
		
		conn.send("{ value :" + data+"}")  # echo
	conn.close()

