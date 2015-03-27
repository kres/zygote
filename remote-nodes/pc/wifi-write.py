#pseudo sensor that I can write to
# for read there is wifi-temp, for event there is wifi-bell

#PORT 8893

import socket

TCP_IP = '0.0.0.0'
TCP_PORT = 8893
BUFFER_SIZE = 1024

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((TCP_IP, TCP_PORT))
s.listen(1)

while True:
	conn, addr = s.accept()
	print 'Connection address:', addr
	while 1:
		data = conn.recv(BUFFER_SIZE)
		if not data: break
		print "received data:", data
	conn.close()