import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export const Topics = ({ topics, changeActiveTopic }) => {
  return (
    <div className="topics-flex-container">
      <List>
        {topics.map((topic) => (
          <ListItem
            onClick={(e) => changeActiveTopic(e.target.innerText)}
            key={topic}
            button
          >
            {topic}
          </ListItem>
        ))}
      </List>
    </div>
  );
};
