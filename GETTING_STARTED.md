# Getting started
The folder has been updated to included Expo project specific files. To get both servers up and running, `npm start` or `yarn start`

## Making HTTP requests
To make http requests to the server, I made use of [ngrok](https://ngrok.com/) to setup a proxy. [Download](https://ngrok.com/download) ngrok and follow the installation instructions. After installation, setup a proxy for the server by running the following command: 

```bash
ngrok http 3000
```
> Assuming the server port hasn't been changed from 3000, if so, update to current port.

Then copy the secure(with https) forwarding URI and update the `BASE_URI` constant in the `products.js` file.


## Running Project
The project was built using [Expo](https://expo.io/) and React-native, to view the project on your phone, download the Expo app on the [play-store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) or [App-store](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8). After running the `start` command and the project has been started successfully, scan the provided barcode using your camera on iOS or scan the barcode using the expo client on Android. 

Scanning the barcode will build and download the project to your phone, providing a preview of the application.


## Features Built

- Displaying products on a grid
- Providing sort options for the user
- Date field displayed in relative time.
- Load more items automatically when user scrolls to bottom: 
  - To acheive this, I made use of the `onEndReached` prop callback of the `FlatList` component.
- Ads: I could have bettered the ads experience by building a custom grid container to properly display each ad banner.
