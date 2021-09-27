# TGCAssignment1

# Interactive Map with Data Processing Project – 'Staycay Safely'

## Context
This project develops a mobile-responsive web-based interactive map application called 'Staycay Safely', with data processing from multiple un-structured data sources. From the web application, users can select different layers to see hotels and pandemic/endemic clusters, as well as searching for locations in the map with the selected layers.


## Demo
A live website of the application can be found here: TBC.

## Index
1. UX
2. Technologies Used
3. Future Features To Implement
4. Testing
5. Known Bugs
6. Deployment
7. Credits and Acknoledgement

# 1. User Experience (UX)
## (i) Project Strategy
Following closely the objectives of this interactive map web application (i.e. to provide unstructured pandemic/endemic data into a visual map for easy selection and searching), these user goals were identified and served as guidelines for the features that were implemented.

User Stories | Features
-------------|-------------
User wants to see all Singapore properties with hotel licenses on the map and their basic info. | When the appropriate layer is selected, Singapore hotels are displayed as custom markers on map. Once a marker is clicked, basic info is displayed as popup.
User wants to see all hotels eligible to accommodate overseas travellers served Stay-Home-Notice on map and their basic info. | When the appropriate layer is selected, Stay-Home-Notice hotels are displayed as custom markers on map. Once a marker is clicked, basic info is displayed as popup.
User wants to see all hotels approved for leisure purpose/staycation by Singapore residents on map and their basic info. | When the appropriate layer is selected, Staycation-approved hotels are displayed as custom markers on map. Once a marker is clicked, basic info is displayed as popup.
User wants to see all hotels approved for staycation yet not designated for stay-home-notice on map and their basic info. | When the appropriate layer is selected, such hotels are displayed as custom markers on map. Once a marker is clicked, basic info is displayed as popup.
User can search for a location, address or building name in Singapore, and see it on map in relation to COVID-19 clusters, dengue clusters and/or any of the hotel layers.| A search box is hoisted on the map. Once a text is entered into the search box, the results will be returned and displayed on the map
User can find out more about dengue, covid-19 and Singapore's policies for staycation approved hotels and Stay-Home-Notice hotels | Brief writeup on dengue, covid-19 and Singapore's hotel policies for staycation and Stay-Home-Notice can be found in the web application, with links to external official websites.

## (ii) Project Scope
The project skeleton and UI layout (wireframes) can be found here. TBC

## (iii) Design
The bootstrap framework was used in for the front-end development of the website as it allows for mobile responsive design and easy grid layout.

As the name of the web application suggests, 'Staycay Safely', the colour palette and general design of the website takes after the colours of a light-hearted, cheerful staycation. As the focus of the project is to convert unstructured data published by the government on static websites into visual icons on a map, the layout of the webpage is straightforward and map interactivity is intuitive.

TBC
#ffe261 #ffe261 #733214 #733214 #363531 #363531 #10913f #10913f #f03c15 #f03c15

# 2. Technologies Used
* HTML 5
The project uses HTML5 to structure the content of the website in a semantically meaningful way.
* CSS
The project uses CSS to add stylistic touches to the website.
* Bootstrap
The project uses Bootstrap to structure the layout of the website (e.g. Navbar) and ensure website is mobile responsiveness.
* Javascript
The project uses Javascript to process & match data from external data files & API calls, update HMTL and CSS, generate map and place markers. 
* AJAX
The project uses AJAX extensively to pull data from 8 different data sources: 3 unstructured CSV files, 1 GeoJson file, 1 XML file, 3 API services from 3 map/location service providers - ArcGis, FourSquare and OneMap by Singapore government.
* DOM Manipulation and CSS Modification
The project manipulates DOM and deploys different CSS styling to achieve the effect of single page application.
* Regular Expression
The project uses regular expression extensively to cleanse hotel names from the 3 unstructured CSV data files grabbed from Singapore government's websites (MOH website for Covid-19 clusters, STB website for staycation-approved hotels, ICA/Singapore Hotel Association website for Stay-Home-Notice hotels) against the structured XML file, and populate each hotel with information from the structured XML file. The 3 unstructured CSV files do not have any unique identifiers like postal code, address or any ID. Name is the only common denominator.
* Leaflet library
The project uses Leaflet library to generate map, create multiple layers & layer control, display markers, circles & polygons on the map, based on user selection.
* ArcGIS Geo-search Service
The project uses ArcGIS geo-search service to insert a contextualized search box for location, buildings and addresses in Singapore.


3. Future Features To Implement
A feature for users to drag and drop files for uploads
Bulk uploading of files
Drag and drop files between albums