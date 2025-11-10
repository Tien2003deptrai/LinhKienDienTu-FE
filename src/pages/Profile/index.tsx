import React from "react";

type Props = {};

const Profile = (props: Props) => {
  // For frontend demo, we'll use fixed values
  const loginState = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com"
  };

  return (
    <section
      className="-mb-52 min-h-screen bg-cover bg-no-repeat pt-20"
      style={{
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundPosition: "50%",
      }}
    >
      <div className="mx-auto my-32 flex h-auto max-w-4xl flex-wrap items-center lg:my-0 lg:h-screen">
        {/*Main Col*/}
        <div
          id="profile"
          className="mx-6 w-full rounded-lg bg-white opacity-90 shadow-2xl lg:mx-0 lg:w-3/5 lg:rounded-l-lg lg:rounded-r-none"
        >
          <div className="p-4 text-center md:p-12 lg:text-left">
            {/* Image for mobile view*/}
            <div
              className="mx-auto -mt-16 block h-48 w-48 rounded-full bg-cover bg-center opacity-100 shadow-xl lg:hidden"
              style={{
                backgroundImage:
                  'url("https://mdbootstrap.com/img/new/avatars/2.jpg")',
              }}
            />
            <h6 className="pt-8 italic">Hi, I'm</h6>
            <h1 className="text-3xl font-bold lg:pt-0">{loginState.name}</h1>
            <div className="pt-8 mx-auto w-4/5 border-b-2 border-green-500 opacity-25 lg:mx-0" />
            <p className="pt-8 text-sm">
              Email: <span className="font-bold">{loginState.email}</span>
            </p>
            <p className="pt-4 text-sm">
              This is a frontend demo. No actual user authentication is implemented.
            </p>
            <div className="pt-12 pb-8 text-center">
              <button className="rounded-full bg-gray-800 px-6 py-2 text-white hover:bg-gray-900">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/*Img Col*/}
        <div className="hidden w-full rounded-r-lg bg-cover bg-center lg:block lg:w-2/5">
          <div
            className="h-full rounded-r-lg bg-cover bg-center opacity-80"
            style={{
              backgroundImage:
                'url("https://source.unsplash.com/random/landscape")',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
