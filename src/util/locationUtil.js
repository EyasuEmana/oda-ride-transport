export const checkServiceLocation = (addressComponents) => {
  var country = addressComponents.find((component) =>
    component.types.includes("country")
  )?.short_name;
  return country === "US";
};

export const isLocationInColifornia = (addressComponents) => {
  var country = addressComponents.find((component) =>
    component.types.includes("country")
  )?.short_name;
  var administrativeArea = addressComponents.find((component) =>
    component.types.includes("administrative_area_level_1")
  )?.short_name;
  return country === "US" && administrativeArea === "CA";
};
