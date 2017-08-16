define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "C__Users_alberto_alcolea_Documents_bigData_node_arch_tts_api_rest_doc_main_js",
    "groupTitle": "C__Users_alberto_alcolea_Documents_bigData_node_arch_tts_api_rest_doc_main_js",
    "name": ""
  },
  {
    "description": "<p>Add a new user to de database</p>",
    "type": "post",
    "url": "/user",
    "title": "",
    "name": "add",
    "group": "User",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"name\":\"Victor\",\"surname\":\"Dieguez\",\"user\": \"vdg\",\"password\": \"1234\"}' http://localhost:3000/api/user",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"598c0199c697124204abad36\",\n    \"name\": \"Victor\",\n    \"surname\": \"Dieguez\",\n    \"user\": \"vdg\",\n    \"password\": \"1234\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Victor\",\n  \"surname\": \"Dieguez\",\n  \"user\": \"vdg\",\n  \"password\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal error\n{\n    \"message\": \"User validation failed: surname: Path `surname` is required.\",\n    \"code\": 500\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controller/api_user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Get all Users stored in database</p>",
    "type": "GET",
    "url": "/user",
    "title": "Request User information",
    "name": "findAll",
    "group": "User",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/user",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[{\n    \"_id\": \"598c0199c697124204abad36\",\n    \"name\": \"Victor\",\n    \"surname\": \"Dieguez\",\n    \"user\": \"vdg\",\n    \"password\": \"1234\",\n    \"__v\": 0\n},\n{\n    \"_id\": \"598c02a87f045b2c4886459b\",\n    \"name\": \"Luis\",\n    \"surname\": \"Casado\",\n    \"user\": \"lcv\",\n    \"password\": \"1234\",\n    \"__v\": 0\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controller/api_user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Get an Users by Id</p>",
    "type": "GET",
    "url": "/user/:id",
    "title": "Request User information by Id",
    "name": "getById",
    "group": "User",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/user/598b0b050220e71c0c631753",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"598c0199c697124204abad36\",\n    \"name\": \"Victor\",\n    \"surname\": \"Dieguez\",\n    \"user\": \"vdg\",\n    \"password\": \"1234\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controller/api_user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Delete an existing user by its Id</p>",
    "type": "DELETE",
    "url": "/user/:id",
    "title": "Delete an user",
    "name": "update",
    "group": "User",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE http://localhost:3000/api/user/598c0199c697124204abad36",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"code\": 200,\n\"message\": \"Successfully deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal error\n{\n    \"message\": \"User could not be deleted. Unexpected error.\",\n    \"code\": 500\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controller/api_user.js",
    "groupTitle": "User"
  },
  {
    "description": "<p>Update an existing user by its Id</p>",
    "type": "POST",
    "url": "/user/:id",
    "title": "Update an user",
    "name": "update",
    "group": "User",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -H \"Content-Type: application/json\" -X POST -d '{\"name\":\"Victor\",\"surname\":\"Dieguez\",\"user\": \"vdg\",\"password\": \"1234\"}' http://localhost:3000/api/user/598c0199c697124204abad36",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Victor\",\n  \"surname\": \"Dieguez\",\n  \"user\": \"vdg\",\n  \"password\": \"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.surname",
            "description": "<p>User's surname</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.user",
            "description": "<p>User's login</p>"
          },
          {
            "group": "200",
            "type": "String[]",
            "optional": false,
            "field": "users.password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"_id\": \"598c0199c697124204abad36\",\n    \"name\": \"Victor\",\n    \"surname\": \"Dieguez\",\n    \"user\": \"vdg\",\n    \"password\": \"1234\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal error\n{\n    \"message\": \"User validation failed: surname: Path `surname` is required.\",\n    \"code\": 500\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "./api/controller/api_user.js",
    "groupTitle": "User"
  }
] });
