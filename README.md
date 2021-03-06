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
4. Testing/ Test Cases
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

Colors used:
#FFF8DC  #eaecef  #d9d6df  #eaecef
All these are light, warm colors that fit well with short, delightful and light-hearted staycations.

Topography used:
Verdana, Geneva, Tahoma, sans-serif;
This font series is among the most commonly used and hence most familiar to the general public. Verdana is professional looking without appearing too formal, perfect for fact-based presentation.

# 2. Technologies Used
* HTML 5
The project uses HTML5 to structure the content of the website in a semantically meaningful way.
* CSS
The project uses CSS to add stylistic touches to the website.
* Bootstrap
The project uses Bootstrap to structure the layout of the website (e.g. Navbar) and ensure website is mobile responsiveness.
* Javascript
The project uses vanilla Javascript to process & match data from external data files & API calls, update HMTL and CSS, generate map and place markers. 
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


# 3. Future Features To Implement
* a feature to display covid clusters by date
* a series of synchronized APEX charts to display Singapore's daily covid-19 case count & death count, total case count and death count
* a feature to indicate the size of covid cluster of the depth of color of the circle

# 4. Testing & Test Cases
Test Case Description | Result
----------------------|-----------
To test the website is mobile responsive, that map, text and nav bar resize according to the viewing device | pass
The single-page application changes display according to user interaction on the menu, while staying on the same HMTL page | pass
The interactive map displays different markers, circles and polygons according to the layers selected by the user | pass
The markers, circles and polygons on map display popup with well-sized HTML table showing appropriate data from the data files, when being clicked | pass
The search box is able to populate location candidates based on user input | pass
The search box is able to produce a marker on the input corresponding to the user input | pass

# 5. Known Bugs
* the 3 lines in hamburger menu does not adjust in size according to screen size. All the rest components are responsive.
* marker pinged by the ArcGIS search box does not disappear when the user clicks elsewhere

# 6. Deployment
The project is stored in Github and deployed to Github Pages. 

# 7. Credits and Acknowledge
## Credits
* Four Square place API
* Leaflet library
* ArcGIS search API, ArcGIS geocode service
* OneMap API
* data source from various agencies and statutory boards of Singapore government: STB, MOH, ICA, data.gov.sg
* Bootstrap framework
* Mapbox tiling API
* Axios library
* Man-on-beach icon is from https://icons8.com/icon/ 
## Acknowledgement
This project, while still a MVP with many iterations of enhancements ahead of its release to the public, is functional and bridges a gap in the current Singapore society - lack of map-based presentation of covid clusters and hotel locations in relation to its status of staycation & stay-home-notice. This project would not be possible without the generous support and timely guidance from the following individuals from Trent Global College:
### Paul for his highly comprehensible web development course and teaching, magical touch on problem-solving.
### Sam for his vast knowledge on all key technologies used in this project, generous support in troubleshooting and timely advice.
### Alex for his constant encouragement and just-in-time pep talk.
### All fellow learners from batch 14 for your camaraderie, for inspiring me to do better and work harder, for pointing me to quick fixes & tips, and most importantly, for the great company in this learning journey. 