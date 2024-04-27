# AM Store's Client Site

## Description

This is the client site of AM Store project which is an E-Commerce store for selling Japanese Anime & Manga products with different categories like figures, panels and clothes, <br> Users can shopping Anime & Manga products through this site and have a real shopping experience like any real E-Commerce store.

Users can browse store's products as guests, or they can create accounts to get the complete shopping experience like:

- Saving their shopping cart and favorites products for finding them whenever they back to continue shopping
- Adding and saving their location information for reusing easly when making orders
- Adding and saving their "**fake**" credit cards for reusing easly when making orders
- Completing buying the products in their shopping cart "**virtually**" without paying real money (Because this a virtual store)
- Browsing their past orders
- Leaving ratings on the products they bought before
- Adding comments to the products they bought before

All users can send feedbacks to me if they faced a problem (logical or technical) in the store

## Technologies

- JavaScript <img src="./public/javascript.svg" style="width: 15px;height: 15px; transform: translate(3px, 3px)">
- Next.js <img src="./public/nextjs-13.svg" style="width: 40px;height: 17px; transform: translate(3px, 5px); background: black; padding: 0px 5px">
- Material UI <img src="./public/Material-UI.svg" style="width: 15px;height: 15px; transform: translate(3px, 3px)">
- Redux <img src="./public/redux.svg" style="width: 15px;height: 15px; transform: translate(3px, 3px)">

## Install and Get Started

### Requirements

You need to have `Node.js` installed in your machine to be able to run this project, <br>
So if you don't have `Node.js`, Go to [the official website of Node.js](https://nodejs.org/en/download) and install it.

And now follow these steps to install and run `AM Store` website :point_down:

### 1. Clone the repository on your machine

Open the terminal on your machine whenever you want and run the following command to clone the repository:

```
git clone https://github.com/AbdulrhmanGoni/AM-store-client.git
```

### 2. Install the dependencies

First open `AM-store-client` folder by running the following command:

```
cd AM-store-client
```

And then install project's dependencies by running this command:

```
npm install
```

### 3. Set Up running environment

Create next configurations file `next.config.js`

If you use **Linux** or **Mac** operating systems run this command:

```
touch next.config.js
```

If you use **Windows** operating system run this command:

```
ni next.config.js
```

Open `next.config.js` file and copy the following content into it

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_HOST: "",
    NEXT_PUBLIC_UPLOAD_IMAGE_API_KEY: "",
    NEXT_PUBLIC_UPLOAD_IMAGE_API_HOST_NAME: "https://api.imgbb.com/1/upload",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: "",
  },
};

module.exports = nextConfig;
```

A quick description of each environment variable in `next.config.js` file:
| VARIABLE | DESCRIPTION |
| --- | --- |
| NEXT_PUBLIC_SERVER_HOST | The url of AM Store's server (**The back end API**) |
| NEXT_PUBLIC_UPLOAD_IMAGE_API_KEY | The API key of the used service to upload users avatars ([`imgbb`](https://imgbb.com/)) |
| NEXT_PUBLIC_UPLOAD_IMAGE_API_HOST_NAME | the url of the used service to upload users avatars ([`imgbb`](https://imgbb.com)) |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | The id of Google OAuth 2.0 client that used to sign up users with Google |

<br>

### Run AM Store

To run AM Store use the following command:

```
npm run dev
```

And congratulations 🎉, Your AM Store Server is up and running on http://localhost:3000.

## Feedbacks

I welcome any feedback or suggestions you might have! <br>
if you faced any problem in the project or you have any suggestion improves it,
or even you have some advices to improve me and my skills, <br>
Please feel free to open an issue and discuss it with me or contact me directly on [my LinkedIn account](https://www.linkedin.com/in/abdulrhman-goni-857a36275/)
or throuth my email abdulrhmangoni@gmail.com

Thank you for stopping by! 🌟
