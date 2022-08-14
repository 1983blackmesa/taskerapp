import React from 'react';

function Header() {
    //Date will appear in Header of app
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
return (
<header>
  <h3> {today.toLocaleDateString("en-US", options)} </h3>
</header>

);

}

export default Header;