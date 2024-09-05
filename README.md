# Project Name: Toy Food Sign-up System

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
* [File Structure](#file-structure)

## Overview

This project is a simple sign-up system for a toy food application. It allows users to create an account by providing their details, and stores the information locally and in local storage. It also allows users to add, edit or delete food items with cart section. If the user is an admin, he can delete items, update them or add new food items.

## Features

* User sign-up with validation with IndexedDb.
* Local storage of user data.
* User authentication and authorization.
* Food item management (create, edit, delete) for Admin only.
* Cart section for managing orders.
* Redirect to Toy Food Page after successful sign-up.

## Technologies Used
* TypeScript
* HTML
* SCSS
* LocalStorage
* IndexedDB (insertion of user data)
* Vite (for development and production builds)

## Getting Started
1. Clone the repository to your local machine: `git clone https://github.com/yosshor/Food_Catalog.git`.
2. Install the required dependencies. `npm install` or `npm i`.
3. Run the application `npm run dev`


## File Structure

* `index.html`: The main HTML file for the sign-up form.
* `/src/controllers/`: The TypeScript folder containing the controllers for the application.
* `/src/styles/`: The SCSS file for styling the application.
* `/src/views/`:  The TypeScript files for rendering the pages.
* `/src/models/`:  The data models folder.

