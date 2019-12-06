import React from "react";

import Card from "./card";
import ProfileList from "./profileList";

const winner = ({ winner, loser }) => {
  return (
    <Card
      header={winner.score === loser.score ? "Tie" : "Winner"}
      subheader={`Score: ${winner.score.toLocaleString()}`}
      avatar={winner.profile.avatar_url}
      href={winner.profile.html_url}
      name={winner.profile.login}
    >
      <ProfileList profile={winner.profile} />
    </Card>
  );
};

export default winner;
