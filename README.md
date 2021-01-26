# Airports in U.S.:airplane:
___
**This project visualizes the airport distirbutions in United States based on states, with different color of icons showing wether the airport has air traffic control tower.**

**States are color coded with different 5 different levels:**
* 0-10 Airports
* 11-20 Airports
* 21-40 Airports
* 41-60 airports
* 61+ airports

___

##Interactions :sparkles:
The map has two interactive components, one is the airport icon, which, after clicked on, will show the airport name, its city, and the state it's in. The other one is the state, once click on the state, it shows the airport number and the name of the state. Besides, if you click outside of us, it shows you a ban sign implying that there is no data. The coordinates of the mouse is given on the left bottom.

___

##Plugin :star2:
Two extra plugins are employed in the map that makes the map interactive
the first one is ***Leaflet.Marker.SlideTo***, It allows the marker to move on the map.
*more details on https://gitlab.com/IvanSanchez/Leaflet.Marker.SlideTo.*

The another one is ***Leaflet.MousePosition***, it enables the map to show the coordinates of the mouse at the bottom left corner.
*more details on https://github.com/ardhi/Leaflet.MousePosition*


___
##Data source :file_folder:
the data of the contry broader came from https://bost.ocks.org/mike/.
the data of the airport came from https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile
