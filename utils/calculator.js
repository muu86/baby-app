const getZ = (value, mean, sd) => {
  return (value / mean - 1) / sd;
};

const getPercentileFromZ = (z) => {
  //z == number of standard deviations from the mean

  //if z is greater than 6.5 standard deviations from the mean
  //the number of significant digits will be outside of a reasonable
  //range
  if (z < -6.5) return 0.0;
  if (z > 6.5) return 1.0;

  var factK = 1;
  var sum = 0;
  var term = 1;
  var k = 0;
  var loopStop = Math.exp(-23);
  while (Math.abs(term) > loopStop) {
    term =
      (((0.3989422804 * Math.pow(-1, k) * Math.pow(z, k)) /
        (2 * k + 1) /
        Math.pow(2, k)) *
        Math.pow(z, k + 1)) /
      factK;
    sum += term;
    k++;
    factK *= k;
  }
  sum += 0.5;

  return sum;
};

export const getUserPercentile = ({ gender, month, height }, data) => {
  const [r] = data.filter((d) => d.month == month && d.gender == gender);
  const userPercentile = getPercentileFromZ(getZ(height, r.lms[1], r.lms[2]));
  return +(userPercentile * 100).toFixed(2);
};
