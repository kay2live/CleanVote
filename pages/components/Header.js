import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CleanVote</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Fundraising</a>
        </Link>

        <Link route="/campaigns/showstatus">
          <a className="item">Status</a>
        </Link>

        <Link route="/campaigns/newcandidate">
          <a className="item">Candidate</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
