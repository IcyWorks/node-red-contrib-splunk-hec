var SplunkLogger = require("splunk-logging").Logger;


module.exports = function(RED) {
    function SplunkHec(config) {
        RED.nodes.createNode(this, config);

        var context = this.context();
        var node = this
        var server = RED.nodes.getNode(config.server);
        var message = null;

        /**
         * Only the token property is required.
         */
		this.metadataName = config.metadataName || "metadata";
		this.name = (config.name.toString() != "") ? config.name.toString() : server.name;
        this.SourceType = server.SourceType;
        this.URI = server.URI;
        this.Token = server.Token;
        this.Host = server.Host;
        this.Index = server.Index;
        this.Source = server.Source;
        this.LogLevel = server.LogLevel;
        this.LogConsole = server.LogConsole;



        var splunkConfig = {
            token: server.Token,
            url: server.URI
        };

        this.on('input', function(msg) {

            // Create a new logger
            var Logger = new SplunkLogger(splunkConfig);

            Logger.error = function(err, context) {
                // Handle errors here
                if (server.LogConsole == true)
                    console.log("error", err, "context", context);
            };

            // set the log level if it is part of the message
            var level = msg.LogLevel;
            if(level == undefined) {
                level = server.LogLevel;
            } else {
                // remove from logged message
                delete msg.LogLevel;
            }

            // Attempt to convert msg.payload to a json structure.
            try{
                message = JSON.parse(msg)
            }
            catch(err){
                message = msg
            }

			var payload = {
				message: message,
				severity: level
			};

			// Build metadata object
			payload[this.metadataName] = {
				source: this.Source,
				sourcetype: this.SourceType,
				index: this.Index,
				name: this.name,
				host: this.Host,
				uri: this.URI,
				token: this.Token,
				loglevel: this.LogLevel,
				logconsole: this.LogConsole
			};

            if (server.LogConsole == true)
                console.log("Sending payload", payload);

            Logger.send(payload, function(err, resp, body) {
                // If successful, body will be { text: 'Success', code: 0 }
                if (server.LogConsole == true)
                    console.log("Response from Splunk", body);
            });


        });
    }
    RED.nodes.registerType("splunk-hec", SplunkHec);
};
