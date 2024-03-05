import React from 'react';
import './left.css'; // Import the CSS file for styling

const LeftSidebar = () => {
    return (
        <div className="left-sidebar">
            {/* Content of the left sidebar */}
            <ul>
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
                {/* Add more menu items as needed */}
            </ul>
        </div>
    );
}

export default LeftSidebar;
