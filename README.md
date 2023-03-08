# Find A Clinic??

/pic

Access the live demo here.
---
## Summary
### Project Context
With higher levels of health literacy through the availability of information online, more patients are empowered to take charge of their own health through self care and alternative therapies. These services are available through pharmacies and TCM clinics. However, when searching for nearby healthcare services, the results returned are often mixed.

### Value Proposition/Objective
Find-A-Clinic is designed to encourage patients to locate the correct type of service for their healthcare needs, near their location. This can relieve the burden on healthcare professionals since they do not need to spend resources on patients with minor ailments, and patients can receive cost effective healthcare.
---
## Strategy
### Target Market
The target market includes users:
 - aged 18 to 50 with sufficient IT and health literacy
### Pain Points
- Existing search engines do not sort the results list according to the type of healthcare services and occasionally return inaccurate results, making it tedious for users to look through the list
- Healthcare professionals, such as in the hospital A&E, often receive patients with minor ailments treatable at clinics and pharmacies, thus increasing their workload
---
## Scope
### Functional Specifications (Content)
To address the above pain points, the following features are created:
- Offer geolocation services so that users can effectively compare the distance between their current location and the location of the desired clinic
- Markers with differentiated designs for the respective healthcare services and toggling of layers to help users in their decision journey

### Non-functional
- Website is mobile responsive, so users can view the map on their phone at their convenience
- Search results are hidden so that:
  - Users can directly click on markers to acess details
  - Users can access a larger map area
---
## UI/UX Elements

### Structure
(tree information structure) //diagram

#### Color Scheme
The colors are blue and turqoise shades, to exude a calming effect. The collors are consistently used throughout the app to add to its identity.
//insert color codes, pics

#### Fonts
Lucida Sans gives off a homely and formal vibe, balancing between care and professionalism.

---

## Limitations and Future Implementations
- Dataset is inaccurate sometimes, pointing to erroneous locations
- More functions such as inputting disease symptoms could be implemented to direct users to the appropriate healthcare provider

---

## Technologies Used
| Tech Stack | Usage    |
| :---:   | :---: |
| HTML, CSS, vanilla JavaScript, Bootstrap 5 | Build the main frame of website |
| Axios   | Call APIs |
| Leaflet | Create map and markers   |
| Leaflet Geolocation   | Indicate user's location |

--- 

## Testing
(test cases)

---

## Deployment
The deployment is done through Netlify.

---

## Credits and Acknowledgment
Icons and images:
- Pinterest: Landing page
- Flaticon: Icons for the respective markers

Data:
- FourSquare API: To retrive the locations fr the various clinics

Many thanks to Paul, seniors, and batchmates!!! :)
