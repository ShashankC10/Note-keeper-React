import React from "react";



function Footer(){
    const y=new Date().getFullYear();
    return (
        <footer>
            <p>
                Made by Shashank
                <br/>
                Copyright © {y}
            </p>
        </footer>
    );

}

export default Footer;