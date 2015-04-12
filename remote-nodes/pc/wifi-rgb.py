#RGB led demo, this should work with the color-picker
# PORT : 8894
#Data input format r:g:b => 200:50:100
import sys
import socket
import serial


TCP_IP = '0.0.0.0'
TCP_PORT = 8894
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
			data = conn.recv(BUFFER_SIZE)
			print data
			data = data.split(":")
			ser.write(chr(int(data[0])))
			ser.write(chr(int(data[1])))
			ser.write(chr(int(data[2])))

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
