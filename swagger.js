export default {
  "openapi": "3.0.0",
  "info": {
    "title": "demo API",
    "description": "This is a fake rental data using mySQL",
    "version": "0.0.1"
  },
  "servers": [
    {
      "url": "http://localhost:8080/api/v1/products",
      "description": "Local server"
    }
  ],
  "paths": {
    "/": {
      "get": {
        "summary": "Return all data with list.",
        "description": "Return all existed data.",
        "parameters": [
          {
            "in": "query",
            "name": "title",
            "schema": {
              "type": "string",
            },
            "description": "Title you want to search"
          },
          {
            "in": "query",
            "name": "address",
            "schema": {
              "type": "string",
            },
            "description": "address you want to search"
          },
          {
            "in": "query",
            "name": "area",
            "schema": {
              "type": "integer",
              "enum": ["99","98","100","101","102","103","104","105","106","107","108","109","110"],
            },
            "description": "area you want to search, Using numbers instead of strings, 東區/99 ,中區/98,南區/100,西區/101,北區/102,北屯區/103,西屯區/104,南屯區/105,太平區/106,大里區/107,霧峰區/108,烏日區/109,豐原區/110 "
          },
          {
            "in": "query",
            "name": "price",
            "schema": {
              "type": "string",
              "example": "0_5000"
            },
            "description": "price you want to search,example 0_5000 , search price between 0 to 5000"
          },
          {
            "in": "query",
            "name": "type",
            "schema": {
              "type": "integer",
              "enum":["1","2","3","4"],
              "example": "1"
            },
            "description": "The type of rental you are looking for, 1/整層住家，2/獨立套房,3/分租套房,4/雅房"
          },
          {
            "in": "query",
            "name": "sort",
            "schema": {
              "type": "string",
              "enum": ["price", "-price"],
              "example":"price"
            },
            "description": "sort by price "
          },
        ],
        "responses": {
          "200": {
            "description": "A JSON array of data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new product.",
        "description": "Create a new product.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/productInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Success create user.",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Product"
                }
              }
            }
          }
        }
      }
    },
    "/{id}": {
      "get": {
        "summary": "Return the specific product.",
        "description": "Return the specific product.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "product id which wants to get",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "A JSON object of product",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Product"
                }
              }
            }
          }
        }
      },
      "patch": {
        "summary": "Update the specific product.",
        "description": "Update the specific product.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "product id which wants to update",
            "required": true,
            "type": "string"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/productInput"
              }
            }
          }
        },
        "responses": {
          "204": {
            "description": "Success update product and return the new data",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Product"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete the specific product.",
        "description": "Delete the specific product.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "product id which wants to delete",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "204": {
            "description": "Success delete product and send all data",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                    "items": {
                      "type": "object",
                      "$ref": "#/components/schemas/Product"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Product": {
        "properties": {
          "main_id": {
            "type": "integer",
            "example": 1
          },
          "main_title": {
            "type": "string",
            "example": "租屋"
          },
          "area_name": {
            "type": "integer",
            "example": "100"
          },
          "main_address": {
            "type": "string",
            "example": "自強街"
          },
          "price": {
            "type": "integer",
            "example": "5000"
          },
          "rent_type_name": {
            "type": "string",
            "example": "分租套房"
          }
        },
      },
      "productInput": {
        "properties": {
          "main_title": {
            "type": "string",
            "example": "租屋60"
          },
          "main_area": {
            "type": "integer",
            "example": "110"
          },
          "main_address": {
            "type": "string",
            "example": "建國路50巷"
          },
          "main_type": {
            "type":"integer",
            "example": "2"
          },
          "price": {
            "type": "integer",
            "example": "6000"
          }
        },
        "required": ["main_title", "main_area","main_address","main_type","price"]
      }
    }
  }
}

