import React, { useEffect } from "react";
import { useSelector } from "react-redux";
function Index() {
  const { isBookSuccess } = useSelector((state) => state.bookReducer);
  useEffect(() => {
    console.log("isBookSuccess", isBookSuccess);
  }, [isBookSuccess]);
  return <div>summary</div>;
}

export default Index;
