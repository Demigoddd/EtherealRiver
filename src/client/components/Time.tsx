import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import enLocate from "date-fns/locale/en";

const Time: React.FC<any> = ({ date }) => (
  <>
    {distanceInWordsToNow(date, { addSuffix: true, locale: enLocate })}
  </>
);

export default Time;
