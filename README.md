# Orinoco DevLog 

This is the devlog of the Orinoco project, you will find here the progress of the project concerning the addition of new features and refactoring

Please refer to other devlogs by choosing the appropriate tag
## Table of contents

- [Overview](#overview)
  - [TDD](#tdd)
  - [Features](#features)


## Overview

The cart handling functionality is now complete, tested and validated. 

The code has been refactored to respect the SOLID principles.

## Architecture 

It makes sense to separate the logic into different layers, so I went with a two-layer architecture.

The first layer, the controller, is very simple, it takes care of validating the input data, retrieving the data from the second layer and performing some simple operations

The second layer is a set of tools that can be reused throughout the code base (or in other projects) 

### Config 

This section contains a set of files for configuring the second layer tools. 

It is now very easy for a user to change the parameters of the application like the url of the api for example. 

These files export the modified modules and can therefore be added in dependency inversion

 





 



