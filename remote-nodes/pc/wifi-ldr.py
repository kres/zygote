#plugin code for the wifi adapter
#output values to sparkline or gauge

# PORT : 8895

import sys
import socket
import serial


TCP_IP = '0.0.0.0'
TCP_PORT = 8895
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)
conn = None

if len(sys.argv) < 2:
	s_port = '/dev/ttyUSB0'
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
			#recv req for read
			data = conn.recv(BUFFER_SIZE)
			#write dummy data
			ser.write('1')
			#reads uptill \n
			data = ser.readline().strip()
			print "analog val : ", data
			#send back the data to the client
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
