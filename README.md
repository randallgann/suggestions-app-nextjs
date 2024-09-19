# Next.js Suggestions Application

Welcome to the **Next.js Suggestions Application**! This project is designed as a platform where users can suggest topics and vote on their favorite ideas for discussion. It was created as a personal learning project to explore the capabilities of Next.js, including server-side rendering, API routes, and dynamic routing.

## Features

- **User Authentication**:  
  Users can create an account, log in with Google, Facebook, or register with an email address using [Auth0](https://auth0.com).
  
- **Topic Suggestions and Voting**:  
  Users can submit suggestions and vote on topics that interest them.

- **Responsive Design**:  
  Built with Tailwind CSS, the application is fully responsive, making it user-friendly on both desktop and mobile devices.

- **Next.js Integration**:  
  This project leverages several key features of [Next.js](https://nextjs.org/), including:
  - Server-Side Rendering (SSR)
  - API Routes
  - Dynamic Routing
  
- **TypeScript for Type Safety**:  
  [TypeScript](https://www.typescriptlang.org/) is used throughout the project to enhance code reliability and improve the developer experience.

- **Cloud Infrastructure**:  
  The application is deployed using [Google Cloud Run](https://cloud.google.com/run) and utilizes [Google Firestore](https://cloud.google.com/firestore) as the database. Infrastructure as Code is managed via [Terraform](https://www.terraform.io/).

## Project Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API routes, Firestore
- **Authentication**: Auth0 (Google, Facebook, Email/Password)
- **Deployment**: Google Cloud Run
- **Infrastructure as Code**: Terraform
- **Language**: TypeScript

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   https://github.com/randallgann/suggestions-app-nextjs.git
2. **Install dependencies**:
   ```bash
   cd nextjs-suggestions-app
   npm install
   ```
3. **Set up .tfvars**:
    Create a .tfvars file in the terraform/env directories, using the appropriate variables for each environment. The following variables are required:
    ```bash
    project=""
    region=""
    image=""
    service_name=""
    AUTH0_SECRET=""
    AUTH0_ISSUER_BASE_URL=""
    AUTH0_CLIENT_ID=""
    AUTH0_CLIENT_SECRET=""
    ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:3000.

## Future Improvements

- **Additional Social Logins**:  
  Plan to include more social login providers beyond Google and Facebook.
  
- **UI/UX Enhancements**:  
  Improve the user interface for a more intuitive experience.

- **New Features**:  
  Implement additional features based on user feedback and suggestions.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request. Feel free to open issues for bug reports, feature requests, or general feedback.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Auth0](https://auth0.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Cloud](https://cloud.google.com/)
- [Terraform](https://www.terraform.io/)


