import React from "react";
import Card from "./card";
import ProfileList from "./profileList";

const loser = ({ winner, loser }) => {
  return (
    <Card
      header={winner.score === loser.score ? "Tie" : "Loser"}
      subheader={`Score: ${loser.score.toLocaleString()}`}
      avatar={loser.profile.avatar_url}
      href={loser.profile.html_url}
      name={loser.profile.login}
    >
      <ProfileList profile={loser.profile} />
    </Card>
  );
};

export default loser;
