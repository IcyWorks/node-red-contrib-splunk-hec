## Synopsis

The purpose of this project is to allow node-red to publish a node-red payload to Splunk HEC endpoints. 

NOTE: This is a work in progress as at 03/02/2026
Please do not use until this message is updated to "ready for use."

## Motivation

Original Node created and published by gdziuba
https://github.com/gdziuba/http-event-collector.git
Lacked ability to name nodes or the saved configurations. Our organisation uses this extensively and needed a way to distinguish between multiple saved configs.
This code has been ammended to include these missing features.

## Installation

The easiest way to install is through the Node-Red Palette Manager that can be found in the menu on the top right hand corner of the Node-Red ui.

### Manual install with npm

```sh
npm install -g node-red-contrib-splunk-hec
```
### Install from source
From github:
Navigate to the your home directory on linux is is ~/.node-red/node-modules
```sh
git clone https://github.com/IcyWorks/node-red-contrib-splunk-hec.git
```
```sh
cd splunk-hec
npm install
```

## Setup
[To configure Splunk's HTTP Event Collector, follow these instructions.](https://docs.splunk.com/Documentation/Splunk/9.1.2/Data/UsetheHTTPEventCollector)

[Example Node-RED configuration](https://i.imgur.com/9noXzGI.png)


## Examples:

### Node-RED Functions for converting msg to correct structure for Metric Event Collector. 

#### Single value MQTT payload message to Metric structure:
```sh
var o = msg.payload;
var v = msg.topic;
msg.payload = {};
msg.payload.fields = {};
msg.payload.fields._value = o;
msg.payload.fields.metric_name= v;
return msg;
```

#### Single value with dimensions enabled :
```sh
var o = msg.payload;
var v = msg.topic;
msg.payload = {};
msg.payload.splunkdims = true;
msg.payload.fields = {};
msg.payload.fields._value = o;
msg.payload.fields.metric_name= v;
msg.payload.fields.dimension1= "value1";
return msg;
```
