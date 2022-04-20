const getRand = function () {
  return Math.floor(
      Math.random() * -(1 - 1270) + 1
  );
};
module.exports = {
  getRand: getRand
};