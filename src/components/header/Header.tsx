import * as React from 'react';
import './header.css';

class Header extends React.PureComponent<{}, {}> {
    
      public render() {
        return (
          <div className="header-block">
              <h2 className="text-center">Acme Contact Management</h2>
          </div>
        );
      }
}

export default Header;