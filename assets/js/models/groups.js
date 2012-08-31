var bootstrapData = function(Methods, methodGroupCollection, methodsDict) {

  // holds direct references to all methods, keyed by link name
  methodsDict = {};

  // define service meta data methods:
  var getServiceList = new Methods.Method({
  	name: "Service List",
  	description: "Provide a list of acceptable 311 service request types and their associated service codes.",
  	url: "services.:format",
  	link: "service_list",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service List",
  	endpointBaseUrl: "http://311api.cityofchicago.org/open311/v2/services",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			id: "jurisdiction_id",
  			type: "optional",
  			description: "This is currently optional on Chicago's Open311 endpoint.",
  			example: "cityofchicago.org"
  		})
  	]),
  	responseParameters: new Methods.MethodResponseParameterCollection([
  		new Methods.ResponseParameter({
  			name: "service_code",
  			custom: false,
  			description: "The unique identifier for the service request type"
  		}),
  		new Methods.ResponseParameter({
  			name: "service_name",
  			custom: false,
  			description: "The human readable name of the service request type"
  		}),
  		new Methods.ResponseParameter({
  			name: "description",
  			custom: false,
  			description: "A brief description of the service request type."
  		}),
  		new Methods.ResponseParameter({
  			name: "metadata",
  			custom: false,
  			description: "Determines whether there are additional form fields for this service type."
  		}),
  		new Methods.ResponseParameter({
  			name: "type",
  			custom: false,
  			description: "Explains how this deals with the Open311 service request ID dance."
  		}),
  		new Methods.ResponseParameter({
  			name: "keywords",
  			custom: false,
  			description: "A comma separated list of tags or keywords to help users identify the request type. " +
  			             "This can provide synonyms of the service_name and group."
  		}),
  		new Methods.ResponseParameter({
  			name: "group",
  			custom: false,
  			description: "A category to group this service type within. This provides a way to group " +
  			             "several service request types under one category such as 'sanitation'"
  		})  		  	  			
  	])
  });
  var getServiceDefinition = new Methods.Method({
  	name: "Service Definition",
  	description: "Define attributes associated with a service code.",
  	url: "services/:service_code.:format",
  	link: "service_definition",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Definition",
  	endpointBaseUrl: "http://311api.cityofchicago.org/open311/v2/services",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
  			id: "jurisdiction_id",
  			type: "optional",
  			description: "This is currently optional on Chicago's Open311 endpoint.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_code",
  			id: "service_code",
  			type: "required",
  			description: "The service_code is specified in the main URL path rather than an added query string parameter.",
  			example: "4fd3bd3de750846c530000b9"
  		})  		
  	]),
    responseParameters: new Methods.MethodResponseParameterCollection([
  		new Methods.ResponseParameter({
  			name: "service_code",
  			custom: false,
  			description: "Returns the service_code associated with the definition, the same one submitted for this call."
  		}),
  		new Methods.ResponseParameter({
  			name: "variable",
  			custom: false,
  			description: "'true' denotes that user input is needed. 'false' means the attribute is only used to present information to the user within the description field."
  		}),
  		new Methods.ResponseParameter({
  			name: "code",
  			custom: false,
  			description: "A unique identifier for the attribute."
  		}),
  		new Methods.ResponseParameter({
  			name: "datatype",
  			custom: false,
  			description: "Denotes the type of field used for user input."
  		}),
  		new Methods.ResponseParameter({
  			name: "required",
  			custom: false,
  			description: "'true' means that the value is required to submit service request. 'false' means that the value not required."
  		}),
  		new Methods.ResponseParameter({
  			name: "datatype_description",
  			custom: false,
  			description: "A description of the datatype which helps the user provide their input."
  		}),
  		new Methods.ResponseParameter({
  			name: "order",
  			custom: false,
  			description: "The sort order that the attributes will be presented to the user. 1 is shown first in the list."
  		}),
  		new Methods.ResponseParameter({
  			name: "description",
  			custom: false,
  			description: "A description of the attribute field with instructions for the user to find and identify the requested information."
  		}),
  		new Methods.ResponseParameter({
  			name: "key",
  			custom: false,
  			description: "The unique identifier associated with an option for singlevaluelist or multivaluelist. This is analogous to the value attribute in an html option tag."
  		}),  		  		  		
  		new Methods.ResponseParameter({
  			name: "name",
  			custom: false,
  			description: "The human readable title of an option for singlevaluelist or multivaluelist. This is analogous to the innerhtml text node of an html option tag."
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
    name: "Service Request",
  	description: "Query the current status of an individual request.",
  	url: "requests/:service_request_id.:format",
  	link: "service_request",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Request",
    endpointBaseUrl: "http://311api.cityofchicago.org/open311/v2/requests",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
        id: "jurisdiction_id",
  			type: "optional",
  			description: "This is currently optional on Chicago's Open311 endpoint.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_request_id",
        id: "service_request_id",
  			type: "required",
  			description: "The id of the individual service request you want to look up. The service_request_id is specified in the main URL path rather than an added query string parameter.",
  			example: "12-1245432"
  		}),
      new Methods.Parameter({
        name: "extensions",
        id: "extensions",
        type: "optional",
        description: "The Chicago Open311 endpoint provides supplemental details about Service Requests that are in addition to the ones described in the standard specification. These data are nested in the 'extended_attributes' field in the Service Request response. In order to retrieve the new supplemental details, add the query parameter “extensions=true” to any Open 311 api request.",
        example: "true"
      })            
  	]),
    responseParameters: new Methods.MethodResponseParameterCollection([
      new Methods.ResponseParameter({
        name: "service_request_id",
        custom: false,
        description: "The unique ID of the service request created."
      }),
      new Methods.ResponseParameter({
        name: "service_code",
        custom: false,
        description: "Returns the service_code associated with the definition, the same one submitted for this call."
      }),
      new Methods.ResponseParameter({
        name: "status",
        custom: false,
        description: "The current status of the service request."
      }),
      new Methods.ResponseParameter({
        name: "status_notes",
        custom: false,
        description: "Explanation of why status was changed to current state or more details on current status than conveyed with status alone."
      }),
      new Methods.Parameter({
        name: "service_name",
        custom: false,
        description: "The human readable name of the service request type."
      }),
      new Methods.Parameter({
        name: "service_code",
        custom: false,
        description: "The unique identifier for the service request type."
      }),
      new Methods.Parameter({
        name: "description",
        custom: false,
        description: "A full description of the request or report submitted."
      }),
      new Methods.Parameter({
        name: "agency_responsible",
        custom: false,
        description: "The agency responsible for fulfilling or otherwise addressing the service request."
      }),
      new Methods.Parameter({
        name: "service_notice",
        custom: false,
        description: "Information about the action expected to fulfill the request or otherwise address the information reported."
      }),
      new Methods.Parameter({
        name: "requested_datetime",
        custom: false,
        description: "The date and time when the service request was made."
      }),
      new Methods.Parameter({
        name: "updated_datetime",
        custom: true,
        description: "TBD: The Chicago implementation uses updated_datetime in a manner that differs from Open311. Documentation is still being compiled."
      }),
      new Methods.Parameter({
        name: "expected_datetime",
        custom: false,
        description: "The date and time when the service request can be expected to be fulfilled. This may be based on a service-specific service level agreement."
      }),
      new Methods.Parameter({
        name: "address",
        custom: false,
        description: "Human readable address or description of location."
      }),
      new Methods.Parameter({
        name: "address_id",
        custom: false,
        description: "The internal address ID used by a jurisdictions master address repository or other addressing system."
      }),
      new Methods.Parameter({
        name: "zipcode",
        custom: false,
        description: "The postal code for the location of the service request."
      }),
      new Methods.Parameter({
        name: "lat",
        custom: false,
        description: "latitude using the (WGS84) projection."
      }),
      new Methods.Parameter({
        name: "long",
        custom: false,
        description: "longitude using the (WGS84) projection."
      }),
      new Methods.Parameter({
        name: "media_url",
        custom: false,
        description: "A URL to media associated with the request, eg an image."
      }),
      new Methods.Parameter({
        name: "channel",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.channel). Describes the method that the Service Request was input into the 311 system (i.e. phone, web). "
      }),
      new Methods.Parameter({
        name: "ward",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.ward). The political boundary that the Service Request is located in."
      }),
      new Methods.Parameter({
        name: "police_district",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.police_district). The police district boundary that the Service Request is located in."
      }),
      new Methods.Parameter({
        name: "duplicate",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.duplicate). Indicates that this Service Request is a duplicate of a Service Request that is already in the system. This can happen when, for example, the same pothole is reported multiple times. Use in conjuntion with extended_attributes.parent_service_request_id to identify duplicates and their assoicated 'master' (aka parent) Service Request records."
      }),
      new Methods.Parameter({
        name: "parent_service_request_id",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.parent_service_request_id). When a Service Request is a duplicate, this value shows which Service Request (the parent) it is a duplicate of. Use in conjuntion with extended_attributes.duplicate to identify duplicates and their assoicated 'master' (aka parent) Service Request records."
      }),
      new Methods.Parameter({
        name: "notes",
        custom: true,
        description: "This fields holds nested and related status details, activities, follow-on case details, for the Service Request. Will generally have a Request Opened activity and a Request closed activity when the request is closed. May also hold other activity types (i.e. Dispatch Work Crew) and notes about Follow-on Service Requests (usually transfer of Service Request ownership from one department to another). Each actiivty in the array of 1 or more activities can have additional properties that are described below."
      }),
      new Methods.Parameter({
        name: "notes.summary",
        custom: true,
        description: "Short description of the activity / action described by the note."
      }),
      new Methods.Parameter({
        name: "notes.type",
        custom: true,
        description: "Category of the activity / action described by the note (i.e activity / opened / closed)."
      }),
      new Methods.Parameter({
        name: "notes.description",
        custom: true,
        description: "More detailed description of the activity / action described by the note - usually comes directly from City systems so can be a bit cryptic."
      }),
      new Methods.Parameter({
        name: "notes.extended_attributes",
        custom: true,
        description: "For activities that are actual Follow-on (child) Service Requests, this field holds important information about those child service requests. Specifically, you will find service_name, agency_responsible, and service_request_id of the child SR."
      }),
      new Methods.Parameter({
        name: "notes.datetime",
        custom: true,
        description: "The date and time of the activity / action described by the note."
      })                                                                                        
    ])      	
  });
  var getServiceRequests = new Methods.Method({
  	name: "Service Requests",
  	description: "Query the current status of multiple requests.",
  	url: "requests.:format",
  	link: "service_requests",
  	requiresAuthentication: "No",
  	responseFormats: "JSON, XML",
  	httpMethods: "GET",
  	responseObject: "Service Requests",
  	endpointBaseUrl: "http://311api.cityofchicago.org/open311/v2/requests",
  	parameters: new Methods.MethodParameterCollection([
  		new Methods.Parameter({
  			name: "jurisdiction_id",
        id: "jurisdiction_id",
  			type: "optional",
  			description: "This is currently optional on Chicago's Open311 endpoint.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "service_request_id",
        id: "service_request_id",
  			type: "optional",
  			description: "To call multiple Service Requests at once, multiple service_request_id can be declared; comma delimited.",
  			example: "cityofchicago.org"
  		}),  		
  		new Methods.Parameter({
  			name: "service_code",
        id: "service_code_param",
  			type: "optional",
  			description: "Specify the service type by calling the unique ID(s) of the service_codes you wish to query. This defaults to all service codes when not declared; can be declared multiple times, comma delimited (no spaces)",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "start_date",
        id: "start_date",
  			type: "optional",
  			description: "Earliest datetime to include in search. When provided with end_date, allows one to search for requests which have a requested_datetime that matches a given range. Must use w3 format, eg 2010-01-01T00:00:00Z.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "end_date",
        id: "end_date",
  			type: "optional",
  			description: "Latest datetime to include in search. When provided with start_date, allows one to search for requests which have a requested_datetime that matches a given range. Must use w3 format, eg 2010-01-01T00:00:00Z.",
  			example: "cityofchicago.org"
  		}),
  		new Methods.Parameter({
  			name: "status",
        id: "status",
  			type: "optional",
  			description: "Allows for search of requests which have a specific status. This defaults to all statuses; can be declared multiple times, comma delimited (no spaces); Options: open, closed.",
  			example: "cityofchicago.org"
  		}),
      new Methods.Parameter({
        name: "extensions",
        id: "extensions",
        type: "optional",
        description: "The Chicago Open311 endpoint provides supplemental details about Service Requests that are in addition to the ones described in the standard specification. These data are nested in the 'extended_attributes' field in the Service Request response. In order to retrieve the new supplemental details, add the query parameter “extensions=true” to any Open 311 api request.",
        example: "true"
      }),
      new Methods.Parameter({
        name: "page_size",
        id: "page_size",
        type: "optional",
        description: "Controls the maximum amount of results a single call will return. The default value is 50. The maximum value is 500.",
        example: "50"
      }),      
      new Methods.Parameter({
        name: "page",
        id: "page",
        type: "optional",
        description: "For calls that logically include more records than the page size, the page parameter can be use to page through the results. Use in combination with page_size and with multiple calls to download all data in a logical set of records.",
        example: "1"
      }),
      new Methods.Parameter({
        name: "updated_before",
        id: "updated_before",
        type: "optional",
        description: "TBD. This field is experimental and documentation is still being compiled",
        example: "2012-08-30T17:28:09"
      }),
      new Methods.Parameter({
        name: "updated_after",
        id: "updated_after",
        type: "optional",
        description: "TBD. This field is experimental and documentation is still being compiled",
        example: "2012-08-30T17:28:09"
      }),
      new Methods.Parameter({
        name: "q",
        id: "q",
        type: "optional",
        description: "Query: TBD. This field is experimental and documentation is still being compiled",
        example: "2012-08-30T17:28:09"
      })                                          	 		  		 		  		
  	]),
    responseParameters: new Methods.MethodResponseParameterCollection([
      new Methods.ResponseParameter({
        name: "service_request_id",
        custom: false,
        description: "The unique ID of the service request created."
      }),
      new Methods.ResponseParameter({
        name: "service_code",
        custom: false,
        description: "Returns the service_code associated with the definition, the same one submitted for this call."
      }),
      new Methods.ResponseParameter({
        name: "status",
        custom: false,
        description: "The current status of the service request."
      }),
      new Methods.ResponseParameter({
        name: "status_notes",
        custom: false,
        description: "Explanation of why status was changed to current state or more details on current status than conveyed with status alone."
      }),
      new Methods.Parameter({
        name: "service_name",
        custom: false,
        description: "The human readable name of the service request type."
      }),
      new Methods.Parameter({
        name: "service_code",
        custom: false,
        description: "The unique identifier for the service request type."
      }),
      new Methods.Parameter({
        name: "description",
        custom: false,
        description: "A full description of the request or report submitted."
      }),
      new Methods.Parameter({
        name: "agency_responsible",
        custom: false,
        description: "The agency responsible for fulfilling or otherwise addressing the service request."
      }),
      new Methods.Parameter({
        name: "service_notice",
        custom: false,
        description: "Information about the action expected to fulfill the request or otherwise address the information reported."
      }),
      new Methods.Parameter({
        name: "requested_datetime",
        custom: false,
        description: "The date and time when the service request was made."
      }),
      new Methods.Parameter({
        name: "updated_datetime",
        custom: true,
        description: "TBD: The Chicago implementation uses updated_datetime in a manner that differs from Open311. Documentation is still being compiled."
      }),
      new Methods.Parameter({
        name: "expected_datetime",
        custom: false,
        description: "The date and time when the service request can be expected to be fulfilled. This may be based on a service-specific service level agreement."
      }),
      new Methods.Parameter({
        name: "address",
        custom: false,
        description: "Human readable address or description of location."
      }),
      new Methods.Parameter({
        name: "address_id",
        custom: false,
        description: "The internal address ID used by a jurisdictions master address repository or other addressing system."
      }),
      new Methods.Parameter({
        name: "zipcode",
        custom: false,
        description: "The postal code for the location of the service request."
      }),
      new Methods.Parameter({
        name: "lat",
        custom: false,
        description: "latitude using the (WGS84) projection."
      }),
      new Methods.Parameter({
        name: "long",
        custom: false,
        description: "longitude using the (WGS84) projection."
      }),
      new Methods.Parameter({
        name: "media_url",
        custom: false,
        description: "A URL to media associated with the request, eg an image."
      }),
      new Methods.Parameter({
        name: "channel",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.channel). Describes the method that the Service Request was input into the 311 system (i.e. phone, web). "
      }),
      new Methods.Parameter({
        name: "ward",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.ward). The political boundary that the Service Request is located in."
      }),
      new Methods.Parameter({
        name: "police_district",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.police_district). The police district boundary that the Service Request is located in."
      }),
      new Methods.Parameter({
        name: "duplicate",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.duplicate). Indicates that this Service Request is a duplicate of a Service Request that is already in the system. This can happen when, for example, the same pothole is reported multiple times. Use in conjuntion with extended_attributes.parent_service_request_id to identify duplicates and their assoicated 'master' (aka parent) Service Request records."
      }),
      new Methods.Parameter({
        name: "parent_service_request_id",
        custom: true,
        description: "Nested in extended_attributes field (extended_attributes.parent_service_request_id). When a Service Request is a duplicate, this value shows which Service Request (the parent) it is a duplicate of. Use in conjuntion with extended_attributes.duplicate to identify duplicates and their assoicated 'master' (aka parent) Service Request records."
      }),
      new Methods.Parameter({
        name: "notes",
        custom: true,
        description: "This fields holds nested and related status details, activities, follow-on case details, for the Service Request. Will generally have a Request Opened activity and a Request closed activity when the request is closed. May also hold other activity types (i.e. Dispatch Work Crew) and notes about Follow-on Service Requests (usually transfer of Service Request ownership from one department to another). Each actiivty in the array of 1 or more activities can have additional properties that are described below."
      }),
      new Methods.Parameter({
        name: "notes.summary",
        custom: true,
        description: "Short description of the activity / action described by the note."
      }),
      new Methods.Parameter({
        name: "notes.type",
        custom: true,
        description: "Category of the activity / action described by the note (i.e activity / opened / closed)."
      }),
      new Methods.Parameter({
        name: "notes.description",
        custom: true,
        description: "More detailed description of the activity / action described by the note - usually comes directly from City systems so can be a bit cryptic."
      }),
      new Methods.Parameter({
        name: "notes.extended_attributes",
        custom: true,
        description: "For activities that are actual Follow-on (child) Service Requests, this field holds important information about those child service requests. Specifically, you will find service_name, agency_responsible, and service_request_id of the child SR."
      }),
      new Methods.Parameter({
        name: "notes.datetime",
        custom: true,
        description: "The date and time of the activity / action described by the note."
      })                                
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
