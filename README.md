# React.js Isomorphic Web Application Architecture
Learn to build a complete production-level web app for a blogging platform like Medium, MindOrks, and FreeCodeCamp

[![AfterAcademy](https://img.shields.io/badge/AfterAcademy-opensource-blue.svg)](https://afteracademy.com)

## Demo web app running this project: [**Goto Demo Website**](https://demo.react-app-architecture.afteracademy.com)

<p align="center">
    <img src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/cover-react-app.png">
</p>
<br>

## About this Open Source Project
This open-source project is for you(community). Our Team at [**AfterAcademy**](https://afteracademy.com) has taken this initiative to promote web development learning in the best possible way. We are determined to provide quality content for everyone. Let's do it together by learning from this project.

## We will learn and build the React web application for a blogging platform. 
The main focus will be to create a super fast and production-ready application with SEO.
<br>
Following are the highlights of this project:
* **Isomorphic React web app**: The server sends the rendered pages to the client, and then the client renders the subsequent pages on its own. This is a very important feature for SEO and it also makes the first paint super fast.
* **React Hooks**: This application uses hooks APIs from React, Redux, and other libraries. 
* **Written in Typescript**: The type safety at build time and having intellisense for it in the IDE like vscode is unparalleled to productivity. We have found production bug reduced to a significant amount since most of the code vulnerabilities are identified during the build phase itself. The Typescript was preferred over the Flow for better vscode support and much more type availability for libraries.
* **Separation of concern principle is applied**: Each component has been given a particular role. The role of the components is mutually exclusive. This makes the project easy to be unit tested.
* **Feature encapsulation is adopted**: The files or components that are related to a particular feature have been grouped unless those components are required in multiple features. This enhances the ability to share code across projects.
* **State management using Redux**: The Redux architecture is very well suited for scalable web apps. It is excellent in server side rendering for components that need data from the API server. It is also preferred over the context in the project.
* **Separate API server**: This project also has a server, having the purpose of serving only the pages for the website. Lhe logic of the application lies in a separate API server which is also opensource by us [**here**](https://github.com/afteracademy/nodejs-backend-architecture-typescript).
* **Boilerplate**: Utility classes have been written to reduce the application and Redux boilerplate. 
* **Latest libraries and patterns**: All the libraries used in this project are standard, concerning the latest and modern web development practices.
* **vscode tasks for templates**: For enhancing the productivity while coding on the vscode, many tasks have been written to help generate the initial working code for each component. Just execute these tasks in vscode.

## Architecture of an UI component
<p align="center">
   <img src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/ui-component-architecture.png">
</p>
<br>

## Learn the concepts used in this project
* [Create React Isomorphic App like a Pro](https://afteracademy.com/blog/create-react-isomorphic-app-like-a-pro)

## Node.js Backend API Project: [**Goto Repository**](https://github.com/afteracademy/nodejs-backend-architecture-typescript)

## How to build and run this project
* Install the API server. [**Read Instructions Here**](https://github.com/afteracademy/nodejs-backend-architecture-typescript)
* Install using Docker Compose [**Recommended Method For Production**] 
    * Clone this repo.
    * Make a copy of **.env.example** file to **.env**.
    * Make a copy of **tests/.env.test.example** file to **tests/.env.test**.
    * Make sure the **.env** file has the **API_BASE_URL** point to the API server.
    * Install Docker and Docker Compose. [Find Instructions Here](https://docs.docker.com/install/).
    * Execute `docker-compose up -d` in the terminal from the repo directory.
    * You will be able to access the website from http://localhost:3001
    * *If having any issue* then make sure 3001 port is not occupied else provide a different port in **.env** file.
 * Install Without Docker [**2nd Method For Development**]
    * Do steps 1 to 4 as listed above for **Install using Docker Compose**.
    * Execute `npm install`
    * Run the project:
      * Development: Execute `npm run watch`
      * Production: Execute `npm start`
    * You will be able to access the website from http://localhost:3001

### Find this project useful? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

## Website Pages
* Landing 
* Blog List
* Blog Page
* Writing Pad - Markdown Editor
* Preview - Markdown to HTML
* Blog Detail Form
* Writer Blogs Management
* Editor Blogs Management

<p float="left">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/1.png">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/2.png">
</p>
<p float="left">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/3.png">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/4.png">
</p>
<p float="left">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/5.png">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/6.png">
</p>
<p float="left">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/7.png">
  <img width="45%" src="https://raw.githubusercontent.com/afteracademy/react-app-architecture/master/.templates/github_assets/screenshots/8.png">
</p>

 ## Project Directory Structure
 ```
 .
├── .templates
│   ├── component
│   │   ├── actions.ts
│   │   ├── assets
│   │   │   └── .gitkeep
│   │   ├── index.tsx
│   │   ├── reducer.ts
│   │   └── style.ts
│   └── simple_component
│       ├── index.tsx
│       └── style.ts
├── .vscode
│   ├── extensions.list
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── public
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── template.html
├── src
│   ├── app-types.d.ts
│   ├── index.tsx
│   ├── reducers.ts
│   ├── server
│   │   ├── app.ts
│   │   ├── devStoreConfig.ts
│   │   ├── pageBuilder.tsx
│   │   ├── routes.tsx
│   │   ├── server-types.d.ts
│   │   ├── server.dev.ts
│   │   ├── server.prod.ts
│   │   └── template.ts
│   ├── theme.ts
│   ├── ui
│   │   ├── app
│   │   │   ├── actions.ts
│   │   │   ├── index.tsx
│   │   │   ├── reducer.ts
│   │   │   ├── routes.tsx
│   │   │   └── style.ts
│   │   ├── auth
│   │   │   ├── actions.ts
│   │   │   ├── index.tsx
│   │   │   ├── login.tsx
│   │   │   ├── reducer.ts
│   │   │   ├── singup.tsx
│   │   │   └── style.ts
│   │   ├── bloglist
│   │   │   ├── actions.ts
│   │   │   ├── assets
│   │   │   │   └── blog-page-cover.jpg
│   │   │   ├── index.tsx
│   │   │   ├── reducer.ts
│   │   │   └── style.ts
│   │   ├── blogpage
│   │   │   ├── actions.ts
│   │   │   ├── index.tsx
│   │   │   ├── reducer.ts
│   │   │   └── style.ts
│   │   ├── common
│   │   │   ├── confirmation
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── firstletter
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── markdown
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── placeholders
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   ├── preview
│   │   │   │   ├── index.tsx
│   │   │   │   └── style.ts
│   │   │   └── snackbar
│   │   │       ├── index.tsx
│   │   │       └── style.ts
│   │   ├── editor
│   │   │   └── blogs
│   │   │       ├── actions.ts
│   │   │       ├── index.tsx
│   │   │       ├── reducer.ts
│   │   │       └── style.ts
│   │   ├── footer
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── header
│   │   │   ├── assets
│   │   │   │   └── afteracademy-logo.svg
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── landing
│   │   │   ├── assets
│   │   │   │   ├── afteracademy-blog.jpg
│   │   │   │   ├── afteracademy-youtube.jpg
│   │   │   │   ├── mindorks-blog.jpg
│   │   │   │   ├── mindorks-logo.svg
│   │   │   │   ├── mindorks-medium-blog.jpg
│   │   │   │   ├── mindorks-opensource.jpg
│   │   │   │   └── mindorks-youtube.jpg
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   ├── notfound
│   │   │   ├── index.tsx
│   │   │   └── style.ts
│   │   └── writer
│   │       ├── myblogs
│   │       │   ├── actions.ts
│   │       │   ├── index.tsx
│   │       │   ├── reducer.ts
│   │       │   └── style.ts
│   │       └── writingpad
│   │           ├── actions.ts
│   │           ├── form.tsx
│   │           ├── index.tsx
│   │           ├── reducer.ts
│   │           └── style.ts
│   └── utils
│       ├── appUtils.ts
│       ├── creator.ts
│       ├── importer.ts
│       ├── network.ts
│       ├── pageUtils.ts
│       └── reduxMiddlewares.ts
├── tests
│   ├── .env.example
│   ├── .env.test.example
│   ├── example.test.ts
│   └── setup.ts
├── tools
│   ├── babel-register.js
│   └── importer-loader.js
├── .babelrc
├── .dockerignore
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── jest.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
└── webpack.config.js
 ```

### Find this project helpful? :heart:
* Support it by clicking the :star: button on the upper right of this page. :v:

### License
```
Copyright (C) 2020 MINDORKS NEXTGEN PRIVATE LIMITED

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
