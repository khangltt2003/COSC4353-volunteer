import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow";

const HomePage = () => {
  return (
    <div>
      <div className="relative h-screen flex flex-col items-center justify-center">
        <div className=" bg-white border border-gray-200 rounded-lg shadow-lg max-w-lg mx-auto z-20 relative">
          <div className="flex flex-col items-center justify-center h-[500px] p-5">
            <h1 className="text-teal-600 text-3xl font-bold font-sans">Welcome to TALKConnect!</h1>
            <h2 className="text-teal-500">Pioneers in engaging volunteers for the healthcare community.</h2>
            <br />
            <Link to="/event">
              <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300">
                Find Opportunities
              </button>
            </Link>
          </div>
        </div>
        <Slideshow />

        <main>
          <section></section>

          <section>
            <h2></h2>
            <p></p>
          </section>

          <section>
            <h2></h2>
            <p></p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;

{
  /*Background image styling is here
<div
style={{
  backgroundImage: `url(${Bg})`,
  backgroundSize: 'cover',  // Makes the image smaller
  backgroundRepeat: 'no-repeat',  // Prevents image from repeating
  minHeight: '100vh',
}}> */
}

{
  /* <div>
        {/* Conditionally render based on login status 
        {isLoggedIn ? (
          <div>
            <h1>Welcome Back, User!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Welcome to Our Website!</h1>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div> */
}

{
  /* Add quote here with negative margin to move it up */
}
{
  /* <blockquote className="text-gray-500 italic mb-2 -mt-8">
                "The best way to find yourself is to lose yourself in the service of others."
              </blockquote> */
}
