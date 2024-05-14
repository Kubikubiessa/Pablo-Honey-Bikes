 // import React, { useState, useContext } from "react";
// import "../navbar/Navbar.css";

// import { Link } from "react-router-dom";
// let hovering = false;
// //This is a dropdown menu component that takes the props label and items. Items is an array of objects with the properties path and label that is used to create the links in the dropdown menu. the items will be hardcoded in the file where the dropdown menu is used.
// const DropdownMenu = ({ label, items }) => {

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [hoveringOnDropdown, setHoveringOnDropdown] = useState(false);
//   // Close dropdown when mouse leaves both the link and the dropdown menu
//   const closeDropdown = () => {
//     console.log("closeDropdown1");
//     setTimeout(function () {
//       console.log("in time out", hoveringOnDropdown, hovering);
//       if (!hovering) {
//         console.log("closeDropdown not hovering - set to false", hoveringOnDropdown, hovering);
//         setShowDropdown(false);
//       }
//     }, 2000); // Delay to allow moving to the dropdown menu
//   };
//   return (
//     <li
//       className="dropdown-item"
//       //show the dropdown menu when hovering on the link by using onMouseEnter and set the state setShowDropdown to true
//       onMouseEnter={() => {
//         console.log("onMouseEnter");
//         setShowDropdown(true);
//         setHoveringOnDropdown(true);
//         hovering = true;
//       }}
//       //close the dropdown menu when the mouse leaves the link by using onMouseLeave and invoke the closeDropdown function
//       onMouseLeave={() => {
//         setHoveringOnDropdown(false);
//         hovering = false;
//         closeDropdown();
//       }}
//     >
//       <Link to="#" className="nav-links">
//         {label}
//       </Link>
//       {showDropdown && (
//         <div
//           className="dropdown-menu"
//           onMouseEnter={() => {setHoveringOnDropdown(true); hovering = true;}}
//           onMouseLeave={() => {
//             setHoveringOnDropdown(false);
//             hovering = false;
//             closeDropdown();
//           }}
//         >
//           {/* map through the items array passed in the dropdown menu and creating a link for each path of the item */}
//           {items.map((item, index) => (
//             <Link key={index} to={item.path} className="dropdown-item">
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}
//     </li>
//   );
// };
// export default DropdownMenu;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2t5aG9nZzQyNzNAeWFob28uY29tIiwidXNlcm5hbWUiOiJwYWJsbyIsIl9pZCI6IjY1MTQ3OTE5YzcxNWE0NDcxMmZmZGE3NSIsInJvbGUiOnsiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRhIiwibmFtZSI6IkFkbWluIiwic2NvcGUiOlt7InRpdGxlIjoibWFuYWdlX3VzZXJzIiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRiIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGIifSx7InRpdGxlIjoiYWRkX3Byb2R1Y3QiLCJfaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGMiLCJpZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI0YyJ9LHsidGl0bGUiOiJ1cGRhdGVfcHJvZHVjdCIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI0ZCIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRkIn0seyJ0aXRsZSI6ImRlbGV0ZV9wcm9kdWN0IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRlIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGUifSx7InRpdGxlIjoiYWRkX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRmIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGYifSx7InRpdGxlIjoidXBkYXRlX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUwIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTAifSx7InRpdGxlIjoiZGVsZXRlX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUxIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTEifSx7InRpdGxlIjoibWFuYWdlX29yZGVycyIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1MiIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUyIn0seyJ0aXRsZSI6InZpZXdfcHJvZHVjdHMiLCJfaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTMiLCJpZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1MyJ9LHsidGl0bGUiOiJwbGFjZV9vcmRlciIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1NCIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU0In0seyJ0aXRsZSI6InZpZXdfb3JkZXJzIiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU1IiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTUifSx7InRpdGxlIjoidmlld19vcmRlciIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1NiIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU2In1dLCJfX3YiOjAsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRhIn19LCJpYXQiOjE3MDY5MDg4MDQsImV4cCI6MTcwNjkyMzIwNH0.fwOd0qDm2efJuYkh9tMJ7Ss0y8zaSeomoHl0oEOqSEQ

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2t5aG9nZzQyNzNAeWFob28uY29tIiwidXNlcm5hbWUiOiJwYWJsbyIsIl9pZCI6IjY1MTQ3OTE5YzcxNWE0NDcxMmZmZGE3NSIsInJvbGUiOnsiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRhIiwibmFtZSI6IkFkbWluIiwic2NvcGUiOlt7InRpdGxlIjoibWFuYWdlX3VzZXJzIiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRiIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGIifSx7InRpdGxlIjoiYWRkX3Byb2R1Y3QiLCJfaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGMiLCJpZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI0YyJ9LHsidGl0bGUiOiJ1cGRhdGVfcHJvZHVjdCIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI0ZCIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRkIn0seyJ0aXRsZSI6ImRlbGV0ZV9wcm9kdWN0IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRlIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGUifSx7InRpdGxlIjoiYWRkX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRmIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNGYifSx7InRpdGxlIjoidXBkYXRlX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUwIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTAifSx7InRpdGxlIjoiZGVsZXRlX2NhdGVnb3J5IiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUxIiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTEifSx7InRpdGxlIjoibWFuYWdlX29yZGVycyIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1MiIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjUyIn0seyJ0aXRsZSI6InZpZXdfcHJvZHVjdHMiLCJfaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTMiLCJpZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1MyJ9LHsidGl0bGUiOiJwbGFjZV9vcmRlciIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1NCIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU0In0seyJ0aXRsZSI6InZpZXdfb3JkZXJzIiwiX2lkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU1IiwiaWQiOiI2NTE0NzkwN2E1N2EzOGYxZjAxMWIyNTUifSx7InRpdGxlIjoidmlld19vcmRlciIsIl9pZCI6IjY1MTQ3OTA3YTU3YTM4ZjFmMDExYjI1NiIsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjU2In1dLCJfX3YiOjAsImlkIjoiNjUxNDc5MDdhNTdhMzhmMWYwMTFiMjRhIn19LCJpYXQiOjE3MTQ2OTM0MTYsImV4cCI6MTcxNDcwNzgxNn0.TIdWMfRia0O6Oeox6i4PVklf_uKToHRRSly27paZthU

{
    "productname": "Nice Wheel",
    "price": 455.00,
    "properties": [
      {
        "key": "wheel",
        "value": "perfect"
      }
    ],
    "category": "65147907a57a38f1f011b243"
  }
  