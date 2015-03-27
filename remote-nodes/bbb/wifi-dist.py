#Controls ultra sonic snenor using PyBBIO
# READ : return val format over TCP
#	{
#		"value" : "1.2"
#	}
#	=> 1.2m distance

# OR
# with read, send input param {"treshold" : "0.5"}
#then this module will return '1' if dist < 0.5; else '0'

# PORT : 8891

