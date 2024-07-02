// import React, { useState } from 'react';
// import FacebookLogin from 'react-facebook-login';

// const FacebookLoginButton = () => {
//   const [user, setUser] = useState(null);

//   const responseFacebook = (response) => {
//     console.log(response);
//     setUser(response);
//   };

//   return (
//     <div>
//       {!user ? (
//         <FacebookLogin
//           appId="777621827692539"
//           autoLoad={false}
//           fields="name,email,picture"
//           callback={responseFacebook}
//           icon="fa-facebook"
//         />
//       ) : (
//         <div>
//           <h2>Welcome {user.name}</h2>
//           <img src={user.picture.data.url} alt={user.name} />
//           <p>Email: {user.email}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacebookLoginButton;
