## Node API Template
My first basic web service built using Node, Express. It is a template for creating NodeJS API services.

(Note: all sensitive information pertaining to WSD services such as endpoints, tokens, client secrets had been hidden for security reasons)

## Installation
	-git clone https://github.com/swfl20/WSD-api.git
	-cd WSD api
	-npm install

The simple challenge/exercise entails the following:

	1) get auth token
	2) use Product Store search call to return the results of 1 product
	3) find out the total number of products in the org's store
	4) Use pagination to retrieve the records in groups of 10,000, it is possible to paginate concurrently/in parallel (e.g. 10 pages at a time).
	5) find all identifiers beginning with the string LU
	6) return the results as a JSON string, writing to a txt file somewhere within the directory