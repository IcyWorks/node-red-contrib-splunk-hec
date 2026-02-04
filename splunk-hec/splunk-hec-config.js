module.exports = function(RED) {
    function SplunkHecConfig(c) {
        RED.nodes.createNode(this,c);
        this.name = c.name;
        this.URI = c.URI;
        this.Token = c.Token;
        this.SourceType = c.SourceType;
        this.Host = c.Host;
        this.Source = c.Source;
        this.Index = c.Index;
        this.LogLevel = c.LogLevel;
        this.LogConsole = c.LogConsole;
    }
    RED.nodes.registerType("splunk-hec-config", SplunkHecConfig);
};
