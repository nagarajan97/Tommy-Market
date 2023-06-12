*******************   Welcome to Tommy Market  ******************************
	This is E-commerce application which been developed as part of training @ Cognizant.

Features:
	From User point of View:
		-> User registation
		-> User login
		-> User password reset
		-> User profile management
		-> Product list
		-> Product Adding to cart
		-> Order tracking
		-> Order history
		-> Favorite item tracking
		-> Games section
		-> Customer Feedback
		-> Contact us
	From Admin point of View:
		-> Admin registation through Access code
		-> Admin login
		-> Admin password reset
		-> Admin profile management
		-> List Customer
		-> Customer management
		-> Product Management
		-> Category management
		-> View product by category
		-> Feedback Management

Configuration Guide:

	For Populate Tables:
		TommyMarket is schema that configured on Dotnet MVC.
		Execute DatabaseBackup.sql on Microsoft SQL Server Management Studio 19 to create schema and Table with dummy data on Database server.

	For DotNet MVC execution:
		The Dotnet code act as intermediator between Frontend(React) and Database(SQL)
			-> Open the Root folder (DotNet-Backend) on Visual studio 2022.
			-> Double click on WebApplication solution.
			-> Execute the controller file(LoginController.cs)

	For React script execution:
		The React script creates the UI for user interaction.
			-> Open the Root folder (React-Frontend) on Visual studio code.
			-> On terminal Run "npm install" and "npm start"

