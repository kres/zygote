Zygote Platform
============

This is platform specific code, will be populated later.

This will be used when we separate the zygote-server code (REST interface) from most of the platform specific hardware control logic. This will be done at a later stage, when we would want to host the REST server elsewhere other than the BBB. Then the BBB connects as a client.

Now : BBB (server) <--> zygote.js (client)

Later : BBB (client) <--> Server (elsewhere) <--> zygote.js (client)

