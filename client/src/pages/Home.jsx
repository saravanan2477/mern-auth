import React from "react";
import Header from "../components/Header";


const Home = () => {
  return (
    <>
    <Header/>
   

    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-boold mb-4 text-slate-700">
        Welcome to my Auth App!
      </h1>
      <p className="mb-4 text-slate-700">
        Welcome to our secure and user-friendly authentication home page, built
        with the power and flexibility of React. Here, users can effortlessly
        sign in or register for an account, ensuring a seamless and intuitive
        experience. Our clean, modern interface is designed for optimal user
        engagement, making navigation straightforward and efficient. We
        prioritize security, implementing robust authentication mechanisms to
        protect your personal information. With features like password recovery,
        social media login integration, and responsive design, our React
        authentication home page ensures you have a smooth and secure journey
        from the moment you arrive. Explore the future of user authentication
        with confidence and ease.
      </p>
      <p className="mb-4 text-slate-700">
        Our authentication system is designed to cater to both new and returning
        users, offering a streamlined registration process and quick,
        hassle-free login. For new users, our sign-up process is simple and
        fast, requiring minimal information to get started while ensuring
        top-notch security. Returning users will appreciate the swift login
        process, enabling them to access their accounts with just a few clicks.
        The integration of social media login options provides an added layer of
        convenience, allowing users to sign in with their existing accounts from
        popular platforms like Google, Facebook, and Twitter.
      </p>
      <p className="mb-4 text-slate-700">
      Beyond just logging in and registering, our home page offers comprehensive support features to enhance user experience. The intuitive design guides users through every step, from account creation to troubleshooting login issues. Our password recovery feature ensures that users can regain access to their accounts promptly if they forget their credentials. Additionally, the mobile-friendly design guarantees that users can enjoy the same seamless experience on any device. By focusing on user-centric design and robust security measures, our React authentication home page sets a new standard for how users interact with online services.
      </p>
    </div>
    </>
  );
};

export default Home;
