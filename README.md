This project is the implementation of BBC Coding Challenge.

This project is implemented as 2 stand-alone apps:
- [ReactJS Frontend App](https://github.com/swaption2009/bbc/tree/master/frontend)
- [Rails 5 API-only Backend App](https://github.com/swaption2009/bbc/tree/master/backend)

Note: since the default settings of React and Rails apps are running on port 3000, we need to run Rails app on port  3001 to prevent the conflict.

## Table of Contents

- [How to install and run ReactJS frontend app](#install-and-run-react-app)
- [How to install and run Rails backend app](#install-and-run-rails-app)
- [React Components](#react-components)
- [Rails Backend](#rails-backend-service)
- [Trade-offs](#trade-offs)

## Install and Run React App

* Download from the [source code](https://github.com/swaption2009/bbc/tree/master/frontend)
* `npm install` or `yarn install` to install dependencies.
* `npm start` or `yarn start` to run app on port 3000.

## Install and Run Rails App

* Download from the [source code](https://github.com/swaption2009/bbc/tree/master/backend)
* `bundle install` to install gems
* `rails db:create && rails db:migrate` to prepare database
* `rails s -p 3001` to run app on port 3001

## React Components

The frontend apps are composed of the following components:

* `App.js` is the app container and entry point of the frontend app. 
  * It implements React `componentDidMount()` lifecycle to grab data (ie. cafes, item_categories, items, item_details) from `githubusercontent` endpoints.
  * Once the data has been added, we'll store them in state management.
  * `buildItem()` and `categorizeItem()` functions will flatten the different dataset into `item` structure according to our Rails backend API service.
  * `postItem()` utilizes `axios` POST service to create records in our backend database.
  * `showComponent` state will allow Users to open `PriceList` component.
* `PriceList.js` shows data from our database in table format.
  * We also implement `componentDidMount()` to grab items data from Rails database.
  * Once the data is loaded, we'll store in the state and render the data in table format.
  * It has 2 children components, (ie. `BulkPriceChange` and `SkuPriceChange`) that can be toggled to show/hide these components.
  * `PriceList` component will pass `item` as a prop to `SkuPriceChange` component.
* `BulkPriceChange.js` allows user to change bulk item price by category.
  * We have `selectedCategory` state to allows User selects which category they'd like to change the price through a `<select>` dropdown menu.
  * We also have a form with 2 inputs and states to allow User change the price by `percentChange` or `nominalChange`.
  * The `submit` button will get the changed values from the states and post it to our backend database.
* `SkuPriceChange.js` has similar functionality and form as `BulkPriceChange` component. However, the main difference is that this component receives an `item` props from `PriceList` component.

## Rails Backend Service

* Rails backend service allows CRUD operations to store `items` from our frontend app.
* We simplify our database schema by creating `items` table with the following columns: `category`, `sku`, `us_name`, `us_price`, `us_currency`, `jp_name`, `jp_price`, `jp_currency`.
* To prevent storing duplicated items in the database, we implement uniqueness validation by `sku`.

## Trade-Offs

* We use a very simple database schema where we flatten all item attributes into a single table database.
  * Pros:
    * It simplfies our database and API schema. It helps to prevent sending and receiving complex nested attributes between frontend and backend services.
    * It helps to speed up our database query by avoiding complex queries using joint tables.
  * Cons:
    * As we open more countries, we'll need to add more columns by a factor of 3 (ie. `name`, `price`, and `currency`).
    * Adding columns will break our API and complicate the deployment.
  * Risk mitigation #1: improve Database Schema to allow more complex queries:
    * follow the same schema from `githubusercontent` endpoints.
    * create separate tables for `items`, `categories`, `stores`, and join table `category_items`
    * `items` has_one `category`
    * `category` has_many `items`
    * `stores` has_many `items` and `categories`
  * Risk mitigation #2:
    * We can take advantage [React Context](https://reactjs.org/docs/context.html) to set multi-language translations using json files, instead of coding translation logics.
    * If using Rails view, we can take advantage of Rails `I18n` to manage static and activerecords translations and `Globalize` gem to create table duplicates to handle items' localized `name` and `price`.
* Using React lifecycle management to fetch data from `githubusercontent` endpoints and post it to Rails database.
  * Pros:
    * By using `componentDidMount()`, we'll be able to get the data before the main component renders and ensure users will not see null data.
    * It automates fetching data without requiring Users to run a function.
  * Cons:
    * The app will fetch data everytime the main component is rendered.
    * If the service fails, the app will not render at all.
  * Risk mitigation: take advantage `Redux Middleware` to handle API calls while using `Redux store` to render data for React app. It will improve User Experience by getting faster data and component renderings even when making API calls fail.