var bootstrapData = function(Methods, methodGroupCollection, methodsDict) {

  // holds direct references to all methods, keyed by link name
  methodsDict = {};

  // define service meta data methods:
  var getServiceList = new Methods.Method({
  	description: "Provide a list of acceptable 311 service request types and their associated service codes.",
  	url: "services.:format",
  	link: "service_list",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service List",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			type: "optional",
  			description: "This is only required if the endpoint serves multiple jurisdictions.",
  			example: "cityofchicago.org"
  		})
  	])
  });
  var getServiceDefinition = new Methods.Method({
  	description: "Define attributes associated with a service code.",
  	url: "services/:service_code.:format",
  	link: "service_definition",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Definition",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			type: "optional",
  			description: "This is only required if the endpoint serves multiple jurisdictions.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_code",
  			type: "required",
  			description: "The service_code is specified in the main URL path rather than an added query string parameter.",
  			example: "033"
  		})  		
  	])  	
  });

  // service meta data method collection
  var serviceMetaDataCollection = new Methods.MethodCollection(
  	[getServiceList, getServiceDefinition]
  );

  // define group for service meta data methods
  var serviceMetaMethodGroup = new Methods.MethodGroup({
  	name: "Service Request Meta Data",
  	description: "Methods that expose data related to how Service Requests will be exposed in the API.",
  	methods: serviceMetaDataCollection
  });

  // add meta data methods to dict
  methodsDict["service_list"] = getServiceList;
  methodsDict["service_definition"] = getServiceDefinition;


  // define service request methods:
  var getServiceRequest = new Methods.Method({
  	description: "Query the current status of an individual request.",
  	url: "requests/:service_request_id.:format",
  	link: "service_request",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Request",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			type: "optional",
  			description: "This is only required if the endpoint serves multiple jurisdictions.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_code",
  			type: "required",
  			description: "The service_code is specified in the main URL path rather than an added query string parameter.",
  			example: "033"
  		})  		
  	])  	
  });
  var getServiceRequests = new Methods.Method({
  	description: "Query the current status of multiple requests.",
  	url: "requests.:format",
  	link: "service_requests",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Request",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			type: "optional",
  			description: "To call multiple Service Requests at once, multiple service_request_id can be declared; comma delimited. This overrides all other arguments.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_code",
  			type: "optional",
  			description: "Specify the service type by calling the unique ID of the service_code. This defaults to all service codes when not declared; can be declared multiple times, comma delimited.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "start_date",
  			type: "optional",
  			description: "Earliest datetime to include in search. When provided with end_date, allows one to search for requests which have a requested_datetime that matches a given range, but may not span more than 90 days. When not specified, the range defaults to most recent 90 days. Must use w3 format, eg 2010-01-01T00:00:00Z.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "end_date",
  			type: "optional",
  			description: "Latest datetime to include in search. When provided with start_date, allows one to search for requests which have a requested_datetime that matches a given range, but may not span more than 90 days. When not specified, the range defaults to most recent 90 days. Must use w3 format, eg 2010-01-01T00:00:00Z.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "status",
  			type: "optional",
  			description: "Allows one to search for requests which have a specific status. This defaults to all statuses; can be declared multiple times, comma delimited; Options: open, closed.",
  			example: "cityofchicago.org"
  		}),    		 		  		 		  		
  	])  	
  });  

  // define service request method collection
  var serviceRequestCollection = new Methods.MethodCollection(
  	[getServiceRequest, getServiceRequests]
  );

  // define group for service request methods
  var serviceRequestMethodGroup = new Methods.MethodGroup({
  	name: "Service Requests",
  	description: "Methods that allow for reading and writing of Service Requests to the City database.",
  	methods: serviceRequestCollection
  });

  // add service request methods to dict
  methodsDict["service_request"] = getServiceRequest;
  methodsDict["service_requests"] = getServiceRequests;

  methodGroupCollection = new Methods.MethodGroupCollection(
  	[serviceMetaMethodGroup, serviceRequestMethodGroup]
  );  

  return {dict: methodsDict, group: methodGroupCollection};
}
