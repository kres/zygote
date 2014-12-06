# This is a server to test the JS api for zygote
# If requested for an existing file, returns the file 
# else it returns the request body back to the client
# extremely useful for testing out if ajax call is getting 
#converted to the correct REST url

import socket, sys, os

TCP_IP = '127.0.0.1'
TCP_PORT = 6060
BUFFER_SIZE = 1024

#create a IPv4 based TCP socket, object 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#attach to the port number
s.bind((TCP_IP, TCP_PORT))
#max client to queue
s.listen(1)

#html files
html_resp = '''HTTP/1.1 200 OK \r\nContent-type: text/html\r\n\r\n'''
#ajax request to use the RESTful service
ajax_resp = "HTTP/1.1 200 OK\nContent-type: text/plain\r\n\r\n"

def get_file(path):
	f = open(path)
	try:
		return f.read()
	finally:
		f.close()

def get_resp(req):
	'''
	req is the request str that has come from the server
	'''
	line = req[0:req.find("\r")]
	
	#split the first line of HTTP req
	method, uri, protocol = line.split()
	path = '.' + uri
	
	#if html file
	if os.path.isfile(path):
		return html_resp + get_file(path) + '\n\n'
	#REST req
	else:
		return ajax_resp + req + '\n\n'
	
while 1:
	try:
		#make the connection
		conn, addr = s.accept()

		#print client address
		print 'Connection address:', addr
		data = ""
		buf = ""

		#read all the data from the client
		data = conn.recv(BUFFER_SIZE * 4)
			
		print "received data"
		print data
		conn.send(get_resp(data ))  # echo
		conn.close()
		
	except KeyboardInterrupt as k:
		print "shutting down server....."
		break
		
	except Exception as e:
		print "Something wrong :("
		print e	

