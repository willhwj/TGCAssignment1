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
User wants to see all hotels approved for staycation yet not stay-home on map and their basic info. | When the appropriate layer is selected, Stay-Home-Notice hotels are displayed as custom markers on map. Once a marker is clicked, basic info is displayed as popup.

User wants to upload photo to application.	Form to facilitate uploading of files. (Create)
User wants to give uploaded photo a caption and hashtags.	Form to capture user input and process to update database. (Create)
User wants to view uploaded photo with relevant fields.	Display photos back to user in an organised manner. (Read)
User wants to edit photo name, photo caption and hashtags.	Form to capture user edits to photo fields and process to update database. (Update)
User wants to delete an uploaded photo.	Process to soft delete photo from database. (Delete)
User accidentally deletes uploaded photo.	Deletion confirmation form to double check if user wants to continue with delete.
User wants to create an album.	Form to capture user input for album name and description. (Create)
User wants to see all the created albums.	Display all albums in the database to user in a organised manner. (Read)
User wants to upload photo to album.	Form to allow user to select album to upload to.
User wants to edit album name and description.	Form to capture user edits to album fields and process to update database. (Update)
User wants to delete album.	Process to soft delete album from database. (Delete)
User accidentally deletes album.	Deletion confirmation form to double check if user wants to continue with delete.
(ii) Project Scope
The project skeleton and structure (wireframes) can be found here.

(iii) Design
The bootstrap framework was used in for the front-end development of the website as it allows for mobile responsive design and easy grid layout.

As the name of the web application suggests, 'Banarama', the colour palette and general design of the website takes after the colours of a banana (i.e. yellow, brown, black and green). As the focus of the project is a data-centric one, the layout of the webpage is not overly complex. Animated gifs were added to the website to enhance the visual experience of users.

#ffe261 #ffe261 #733214 #733214 #363531 #363531 #10913f #10913f #f03c15 #f03c15

2. Technologies Used
HTML 5
The project uses HTML5 to structure the content of the website.
CSS
The project uses CSS to add stylistic touches to the website.
Bootstrap
The project uses Bootstrap to structure the layout of the website (i.e. Navbar, Footer) and ensure website is mobile responsiveness.
Flask
The project uses the Flask web framework to develop the web application (i.e. Set up connection to MongoDB Atlas, process and validate forms and handle the uploading of files)
Jinja 2
The project uses Jinja2 to write conditional statements to display content blocks when certain conditions are met. Additionally, Jinja2 was used to set up template inherritance and extension of html/css files for the project.
MongoDB Atlas
The project uses MongoDB Atlas as a cloud database to store user data and file uploads.
GoogleFonts
The project uses GoogleFonts to style the typography on the website to enhance the visual experience of users.
FontAwesome 4.7
The project uses the icons provided by FontAwesome 4.7 alongside call-to-action buttons to enhance the user experience by making user interaction with the application more intuitive.
Heroku
The project uses Heroku for the deployment and management of the web application. As Heroku provides timelogs, when an error occurs, it makes easier to identity and remedy bugs.
3. Future Features To Implement
A feature for users to drag and drop files for uploads
Bulk uploading of files
Drag and drop files between albums