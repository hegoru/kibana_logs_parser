export const isJSON = (data) => {
  try {
    JSON.parse(data);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;

  // return /^[\],:{}\s]*$/.test(
  //   text
  //     .replace(/\\["\\\/bfnrtu]/g, "@")
  //     .replace(
  //       /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //       "]"
  //     )
  //     .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  // );
};
