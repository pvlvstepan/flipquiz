# FlipQuiz

![FlipQuiz Logo](public/cover.png)

![GitHub deployments](https://img.shields.io/github/deployments/pvlvstepan/flipquiz/production?logo=vercel&label=Vercel)

FlipQuiz is a free, open-source platform designed to revolutionize online education through gamified learning experiences. It aims to make learning enjoyable and effective by incorporating interactive study sets, encouraging users to create and share study sets for collaborative learning. The platform's study mode, reminiscent of flashcards, enhances engagement and tracks user progress for more effective learning across a wide range of subjects.

## Features

-   Create and share interactive study sets.
-   Collaborative learning through shared study sets.
-   Engaging study mode with flashcard-like interactions.
-   Track and visualize user progress for effective learning.
-   Explore a wide range of subjects.

## Installation

To run FlipQuiz locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/flipquiz.git
    cd flipquiz
    ```

2. Install dependencies:

    ```bash
    yarn install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of your project and add the following:

    ```env
    DATABASE_URL="..." # MongoDB connection string
    NEXTAUTH_SECRET="..."
    JWT_SECRET="..."
    NEXTAUTH_URL="..." # URL of the application
    ```

4. Build and seed the database:

    ```bash
    yarn db:push
    yarn db:seed
    ```

5. Start the development server:

    ```bash
    yarn dev
    ```

6. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Technologies Used

-   [Next.js](https://nextjs.org/)
-   [NextAuth.js](https://next-auth.js.org/)
-   [Prisma](https://www.prisma.io/)
-   [React](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [DnD Kit](https://dndkit.com/)
-   [React Query](https://react-query.tanstack.com/)
-   [Radix UI](https://radix-ui.com/)
-   [Swiper](https://swiperjs.com/)
-   And more (see `package.json` for the full list)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   Special thanks to the contributors and the open-source community.
-   Built as my Final Year Project at the Asia Pacific University of Technology & Innovation.
-   Inspired by a passion for making learning enjoyable and effective.
