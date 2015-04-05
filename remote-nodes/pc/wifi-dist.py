#Fires event when someone is in the vicinity 
#basically used for the desktop demo (someone comes => light goes on)

#When someone approaches, "1" is sent
#When no one is present, "0" is sent

# PORT : 8891

import sys
import socket
import serial


TCP_IP = '0.0.0.0'
TCP_PORT = 8891
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

if len(sys.argv) < 2:
	s_port = '/dev/ttyACM0'
else:
	s_port = sys.argv[1]

while True:
	try:
		print "Waiting for connection...."
		conn, addr = s.accept()
		print 'Connection address:', addr
		print "serial port : ", s_port
		ser = serial.Serial(s_port, 9600)
		while 1:
			data = ser.read(1)
			print "Serial data : " + data
			conn.send(""+data)  

	except KeyboardInterrupt as e:
		print "Connection closed"
		print e

	except Exception as e:
		print "Connection closed"
		print e

	finally:
		if conn:
			conn.close()
		ser.close()
