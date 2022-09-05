# Refinement

Sobre o nome escolhido para a aplicação, busquei no latim qual é palavra que significa "Países", por isso o nome escolhido foi **Terris**.

## Views

- [Home](#homeview)
- [Countries](#countriesview)
- [CountryDetail](#countriesview)

### HomeView

For this screen, which is possibly the first contact the user will have with the application, I decided to leave a simpler layout, on this screen the person will have few actions available, they are:

- Perform a country search by typing;
- Change color theme between **DarkMode** and **LightMode**;
- Access the countries listing view (Countries)

> Note: The theme chosen by the person will be stored in LocalStorage and in the project's Store.

#### HomeView > Future improvements

- Get user's geolocation and suggest his country as the first option;
- Manage a search/access history.

### CountriesView

On this screen I decided to list the countries using a **card** structure containing the information: Flag, Name and Region.

The user was also given only a few interaction options, they are:

- Filter countries by writing in the text field;
- Filter countries by region;
- Access the country details screen by clicking on the card;
- Return to Home by clicking on the logo located on the AppBar;
- Change theme via button on AppBar.

> Note: The filter options are stored in the project's LocalStorage and Store, so when the user returns to the country listing page, the filters are applied again.

#### CountriesView > Future improvements

- Think about a solution for a equal height between cards and flag sizes.

### CountryDetailsView

On this screen I decided to list the most common information for a country, are they:

- Region
- Capital
- Currencies
- Languages
- Total number of inhabitants (population)
- Total occupancy area in square meters (m²)
- Flag

I would have liked to have used the Google Maps API to embed a navigable map of the country, but I realized that it would take longer, so I decided to just leave the link to access GoogleMaps in a new window/tab.

I created a banner highlighting membership of the United Nations.

I have listed the countries that border the country in question.

#### CountryDetailsView > Future improvements

- Search for other APIs that can provide more information about the country, such as:
  - the weather in real time;
  - currency converter;
  - translator from the user's language to the language of the country in question;
  - etc.

## Requests, Store and LocalStorage

Seeking to improve access performance, I decided to store the total list of countries and also those that were accessed in the project's **Store**. With this, if the user accesses a country page again, he will not need to look for the information again in the API.

I'm also using the **Store** to send information about the selected country to the AppBar, so it's possible to show the country's flag and name on the AppBar.

As for **LocalStorage**, I decided to store details like:

- Theme color (Dark or Light);
- Filters by name and region;
- List of possible regions to filter.
