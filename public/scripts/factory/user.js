'use strict';
angular.module('quizApp')
	.factory('userService', function () {
    	var users = [
			{
				"id": 1,
				"name":"root",
				"phone": 9898989898
			},
			{
				"id": 2,
				"name":"nikhil",
				"phone": 9999999999
			},
			{
				"id": 3,
				"name":"makranth",
				"phone": 8888888888
			},
			{
				"id": 4,
				"name":"saumen",
				"phone": 7777777777
			},
			{
				"id": 5,
				"name":"debasish",
				"phone": 9777777777
			}		
		];

		return {
			register : function(dtls)
			{
				users.push(dtls);
				return users;
			},
			getUsers : function()
			{
				return users;
			}
		}
  });
